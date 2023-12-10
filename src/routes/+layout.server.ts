import { adminDB } from '$lib/server/admin';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const productIds = cookies.get('cart');
	if (productIds && productIds.length > 0) {
		const colRef = await adminDB.collection('products').get();
		const products = colRef.docs.map((doc) => doc.data());
		//get ids and add to products
		products.forEach((product, index) => {
			product.id = colRef.docs[index].id;
		});
		const cart = products.filter((product) => productIds.includes(product.id));
		return { cart };
	}
	return {};
}) satisfies LayoutServerLoad;
