import { writable } from 'svelte/store';
import type { Message } from '$lib/types';
import type { Writable } from 'svelte/store';

// Custom store for managing toast messages
function toastStore() {
	// Create a writable store for holding messages
	const { subscribe, update } = writable<Message[]>([]);

	// Function to add a new message to the store
	const addMessage = (message: Message) => {
		update((messages) => [...messages, message]);

		// Automatically dismiss the message after the specified timeout
		setTimeout(() => dismissMessage(message), message.timeout);
	};

	// Function to dismiss a message from the store
	const dismissMessage = (message: Message) => {
		update((messages) => messages.filter((m) => m !== message));
	};

	return {
		subscribe,
		addMessage,
		dismissMessage
	};
}

// Create an instance of the store
export const messages = toastStore();
