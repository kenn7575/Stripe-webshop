import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
const stripe = new Stripe(SECRET_STRIPE_KEY);
export const POST: RequestHandler = async () => {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 2000,
		// note, for some EU-only payment methods it must be EUR
		currency: 'usd',
		// specify what payment methods are allowed
		// can be card, sepa_debit, ideal, etc...
		payment_method_types: ['card']
	});

	return json({
		clientSecret: paymentIntent.client_secret
	});
};
