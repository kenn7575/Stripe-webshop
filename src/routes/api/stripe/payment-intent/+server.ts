import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import type { CartItem } from '$lib/types';
import { adminStripe, adminDB } from '$lib/server/admin';

const stripe = new Stripe(SECRET_STRIPE_KEY);
export const POST: RequestHandler = async ({ locals, cookies }) => {
	/*
1. get ids from cookies
2. get the products from ids
3. get prices and calculate total
4. get firebase uid from locals
5. get stripe customer id from firestore
6. create payment intent
*/
	const productIds = cookies.get('cart') as string | undefined;
	const ids = JSON.parse(productIds ?? '[]') as string[];
	if (!ids || ids.length === 0) {
		throw error(400, 'Cart is empty');
	}
	//get the products from ids
	const colRef = await adminDB.collection('products').get();
	const productsCatalog = colRef.docs.map((doc) => doc.data());
	//get ids and add to products
	const products = productsCatalog.filter((product) => ids.includes(product.id));
	//get prices and calculate total
	const total = products.reduce((acc, product) => acc + product.price * 100, 0);

	//get firebase uid
	const userId = locals.userId;
	if (!userId) {
		throw error(400, 'User is not logged in');
	}
	//get stripe customer id from firestore
	const userRef = await adminDB.collection('users').doc(userId);
	const userSnapshot = await userRef.get();
	if (!userSnapshot.exists) {
		throw error(400, 'User does not exist');
	}
	const { stripeCustomerId, email } = userSnapshot.data() ?? {};
	if (!stripeCustomerId) {
		throw error(400, 'User does not have a stripe customer id');
	}

	//calculate total
	if (total < 250) {
		throw error(400, 'Minimum order is 2.50 DKK');
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		// note, for some EU-only payment methods it must be EUR
		currency: 'dkk',
		// specify what payment methods are allowed
		// can be card, sepa_debit, ideal, etc...
		automatic_payment_methods: {
			enabled: true
		},
		customer: stripeCustomerId,
		receipt_email: email ?? null
	});

	return json({
		paymentIntent: paymentIntent
	});
};

//delete payment intent
export const DELETE: RequestHandler = async ({ request }) => {
	const id = await request.text();
	const paymentIntent = await stripe.paymentIntents.cancel(id);
	return json(paymentIntent);
};
