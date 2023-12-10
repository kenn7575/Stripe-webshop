import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';

export const load = (async ({ locals, url }) => {
	const uid = locals.userId;
	if (!uid) {
		const fromURL = url.pathname;

		throw redirect(302, '/signin?redirect=' + fromURL);
	}
	//get user docs
	const userRef = await adminDB.collection('users').doc(uid);
	const userSnapshot = await userRef.get();
	const user = userSnapshot.data();
	const purchaseRef = await userRef.collection('purchases');
	const purchaseSnapshot = await purchaseRef.get();
	const purchases = purchaseSnapshot.docs.map((doc) => doc.data());
	return { user, purchases };
}) satisfies PageServerLoad;
