import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBGOVP0mcPLyU6Mxc3Fy8ux1iDscXbxutg',
	authDomain: 'webshop-8e96f.firebaseapp.com',
	projectId: 'webshop-8e96f',
	storageBucket: 'webshop-8e96f.appspot.com',
	messagingSenderId: '416993968345',
	appId: '1:416993968345:web:de5dc763161e726da9fec8'
};
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);

export async function signOutUser() {
	await signOut(firebaseAuth);
	const res = fetch('/api/firebase/admin/', {
		method: 'Delete'
	});
	return res;
}

function userStore() {
	let unsubscribe: () => void;

	if (!firebaseAuth || !globalThis.window) {
		console.warn(!firebaseAuth ? 'Auth is not initialized' : 'Window is not defined');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(firebaseAuth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}
export const user = userStore();
