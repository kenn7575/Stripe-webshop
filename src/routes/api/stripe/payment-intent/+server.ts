import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
const stripe = new Stripe(SECRET_STRIPE_KEY);
export const POST: RequestHandler = async ({ request }) => {
	const data = request.text();
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 250,
		// note, for some EU-only payment methods it must be EUR
		currency: 'dkk',
		// specify what payment methods are allowed
		// can be card, sepa_debit, ideal, etc...
		automatic_payment_methods: {
			enabled: true
		}
	});

	return json({
		clientSecret: paymentIntent.client_secret
	});
};

//delete payment intent
export const DELETE: RequestHandler = async ({ request }) => {
	const id = await request.text();
	const paymentIntent = await stripe.paymentIntents.cancel(id);
	return json(paymentIntent);
};
