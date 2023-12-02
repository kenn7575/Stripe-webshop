import type { PageServerLoad } from './$types';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';

export const load = (async () => {
	const stripe = new Stripe(SECRET_STRIPE_KEY);
	const products = await stripe.products.list();
	const prices = await stripe.prices.list();

	return { products, prices };
}) satisfies PageServerLoad;
