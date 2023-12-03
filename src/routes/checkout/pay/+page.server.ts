import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals, url }) => {
	const uid = locals.userId;
	console.log('uid', uid);
	if (!uid) {
		const fromURL = url.pathname;

		throw redirect(302, '/checkout/account');
	}
}) satisfies PageServerLoad;
