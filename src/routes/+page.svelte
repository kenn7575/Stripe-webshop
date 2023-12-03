<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import type Stripe from 'stripe';

	const products = data.products.data;
	const prices = data.prices.data;

	function findPrice(id: string | Stripe.Price | null | undefined): string {
		const res = prices.find((price) => price.id === id);
		if (res && res.unit_amount) {
			const stringNumber = (res.unit_amount / 100).toString();
			return stringNumber.replace('.', ',');
		} else {
			return 'not found';
		}
	}
</script>

<div class="flex w-full justify-center mt-4 px-4">
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
