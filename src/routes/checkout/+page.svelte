<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { cart } from '$lib/functions/shoppingCart';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';

	function removeItemFromCart(id: string) {
		cart.update((items) => {
			const index = items.findIndex((item) => item.id === id);
			if (index !== -1) {
				items.splice(index, 1);
			}
			return [...items];
		});
		localStorage.setItem('cart', JSON.stringify($cart));
	}
</script>

<div class="flex items-center mt-8 flex-col px-32">
	<Table.Root class="w-full mx-auto">
		<Table.Header>
			<Table.Row>
				<Table.Head>Image</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Quantity</Table.Head>
				<Table.Head>Price</Table.Head>
				<Table.Head class="text-right">Total</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $cart as item, i (i)}
				<Table.Row>
					<Table.Cell>
						<img src={item.image} alt={item.name} class="w-10 h-10" />
					</Table.Cell>
					<Table.Cell>{item.name}</Table.Cell>
					<Table.Cell class="font-medium">
						<Input
							on:change={() => {
								if (item.quantity <= 0) {
									removeItemFromCart(item.id);
								}
							}}
							bind:value={item.quantity}
							type="number"
							class="w-32"
						/>
					</Table.Cell>
					<Table.Cell>{item.price} Kr</Table.Cell>
					<Table.Cell class="text-right">{item.price * item.quantity} Kr</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

	<div class="w-full mt-16">
		<div class="flex gap-2 w-full justify-between">
			<Button variant="secondary" href="/">Keep shopping</Button>
			{#if $cart.length > 0}
				<Button href="/checkout/account">Next</Button>
			{:else}
				<Button disabled>Next</Button>
			{/if}
		</div>
	</div>
</div>
