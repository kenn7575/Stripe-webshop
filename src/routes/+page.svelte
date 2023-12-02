<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import type Stripe from 'stripe';

	const products = data.products.data;
	const prices = data.prices.data;

	console.log(products);
	console.log(prices);

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

{#each products as product}
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>{product.name}</Card.Title>
			<Card.Description>{product.description}</Card.Description>
		</Card.Header>
		<Card.Content>
			<AspectRatio ratio={1 / 1} class="bg-muted">
				<img
					src={product.images[0]}
					alt="Gray by Drew Beamer"
					class="rounded-md object-cover h-full w-full"
				/>
			</AspectRatio>
		</Card.Content>
		<Card.Footer class="flex justify-between">
			<p><strong>{findPrice(product.default_price)} DKK</strong></p>
			<Button>Add</Button>
		</Card.Footer>
	</Card.Root>
{/each}
