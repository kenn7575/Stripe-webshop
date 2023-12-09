<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { messages } from '$lib/functions/messageManager';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import type Stripe from 'stripe';

	const products = data.products.data;
	const prices = data.prices.data;
	console.log(products);
	console.log(prices);

	function findPrice(id: string | Stripe.Price | null | undefined): number {
		const res = prices.find((price) => price.id === id);
		if (res && res.unit_amount) {
			return res.unit_amount / 100;
		} else {
			return NaN;
		}
	}

	import { cart } from '$lib/functions/shoppingCart';
	async function addItemToCart(product: Stripe.Product) {
		// update cart
		cart.update((items) => {
			//if item already exists in cart, increase quantity
			const existingItem = items.find((item) => item.id === product.id);
			if (existingItem) {
				existingItem.quantity++;
				return [...items];
			}
			//else add new item to cart
			console.log(typeof findPrice(product.default_price));
			return [
				...items,
				{
					id: product.id,
					name: product.name,
					price: findPrice(product.default_price),
					quantity: 1,
					image: product.images[0]
				}
			];
		});

		// update localstorage

		document.cookie = `cart=${JSON.stringify($cart)}; path=/; samesite=strict; secure=true`;
	}
</script>

<div class="flex w-full justify-center mt-4 px-4 xl:px-40">
	<div class="grid g w-full gap-4">
		{#each products as product}
			<Card.Root class="">
				<Card.Header>
					<Card.Title>{product.name}</Card.Title>
					<Card.Description>{product.description}</Card.Description>
				</Card.Header>
				<Card.Content>
					<AspectRatio ratio={1 / 1} class="bg-muted">
						<img
							src={product.images[0]}
							alt={product.name}
							class="rounded-md object-contain h-full w-full"
						/>
					</AspectRatio>
				</Card.Content>
				<Card.Footer class="flex justify-between">
					<p><strong>{findPrice(product.default_price)} DKK</strong></p>
					<Button
						on:click={() => {
							addItemToCart(product);
						}}>Add</Button
					>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>

<style>
	.g {
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	}
</style>
