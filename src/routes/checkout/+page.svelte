<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { cart } from '$lib/functions/shoppingCart';
	import { Input } from '$lib/components/ui/input';

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

<div class="flex justify-center mt-8">
	<Table.Root class="w-fit mx-auto">
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-56">Image</Table.Head>
				<Table.Head class="w-56">Name</Table.Head>
				<Table.Head class="w-56">Quantity</Table.Head>
				<Table.Head class="w-56">Price</Table.Head>
				<Table.Head class="text-right w-56">Total</Table.Head>
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
</div>
