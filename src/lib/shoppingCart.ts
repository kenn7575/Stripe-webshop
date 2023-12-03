//svelte writable
import { writable } from 'svelte/store';

function customLocalStorageStore(key: string, initialValue?: object | null) {
	// Get the initial value from local storage or use the provided initial value
	const storedValue = localStorage.getItem(key);
	const initial = storedValue ? JSON.parse(storedValue) : initialValue;

	// Create a writable store with the initial value
	const store = writable(initial);

	// Subscribe to the store and update local storage whenever the store changes
	store.subscribe((value) => {
		localStorage.setItem(key, JSON.stringify(value));
	});

	return store;
}
export const shoppingCart = customLocalStorageStore('shoppingCard');
