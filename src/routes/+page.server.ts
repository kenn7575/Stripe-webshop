import type { PageServerLoad } from './$types';
import { adminDB } from '$lib/server/admin';

export const load = (async () => {
	const colRef = await adminDB.collection('products').get();
	const products = colRef.docs.map((doc) => doc.data());
	//get ids and add to products
	products.forEach((product, index) => {
		product.id = colRef.docs[index].id;
	});

	return { products };
}) satisfies PageServerLoad;
