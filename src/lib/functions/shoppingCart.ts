//svelte writable
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { CartItem } from '$lib/types';

export const cart = writable([]) as Writable<CartItem[]>;
