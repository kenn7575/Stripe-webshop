<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data);
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { messages } from '$lib/functions/messageManager';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';

	let products = data.products as CartItem[];

	import { cart } from '$lib/functions/shoppingCart';
	$: console.log($cart);

	import type { CartItem } from '$lib/types';
	async function addItemToCart(product: CartItem) {
		// update cart
		cart.update((items) => {
			//if item already exists in cart, increase quantity
			const existingItem = items.find((item) => item.id === product.id);
			if (existingItem) {
				return [...items];
			}
			//else add new item to cart
			return [
				...items,
				{
					id: product.id,
					title: product.title,
					price: product.price,
					image: product.image,
					image_small: product.image_small
				}
			];
		});

		// update localstorage
		//make a list of item ids
		const ids = $cart.map((item) => item.id);

		document.cookie = `cart=${JSON.stringify(ids)}; path=/; samesite=strict; secure=true`;
		messages.addMessage({
			title: 'Item added to cart',
			text: 'you can now go to the checkout page to complete your order',
			type: 'success',
			timeout: 4000
		});
	}
</script>

<div class="flex w-full justify-center mt-4 px-4 xl:px-40">
	<div class="grid g w-full gap-4">
		{#each products as product}
			<Card.Root class="">
				<Card.Header>
					<Card.Title>{product.title}</Card.Title>
					<Card.Description>{product.description}</Card.Description>
				</Card.Header>
				<Card.Content>
					<AspectRatio ratio={1 / 1} class="bg-muted">
						<img
							src={product.image}
							alt={product.title}
							class="rounded-md object-contain h-full w-full"
						/>
					</AspectRatio>
				</Card.Content>
				<Card.Footer class="flex justify-between">
					<p><strong>{product.price} DKK</strong></p>
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
