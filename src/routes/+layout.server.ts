import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const cart = cookies.get('cart');
	if (cart) {
		return { cart: JSON.parse(cart) };
	}
	return {};
}) satisfies LayoutServerLoad;
