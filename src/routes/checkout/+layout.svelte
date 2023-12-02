<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { DoubleArrowRight } from 'radix-icons-svelte';

	export let data: LayoutData;
	import Button from '$lib/components/ui/button/button.svelte';
	$: url = $page.url.pathname;

	$: colors = [
		url == '/checkout' ? 'secondary' : 'ghost',
		url == '/checkout/account' ? 'secondary' : 'ghost',
		url == '/checkout/pay' ? 'secondary' : 'ghost'
	];
</script>

{#key colors}
	<div class="flex items-center gap-4 justify-center mt-16">
		<Button variant={colors[0]} href="/checkout" class=" w-36">Shopping cart</Button>
		<DoubleArrowRight class="h-6 w-6 text-primary" />

		<Button variant={colors[1]} href="/checkout/account" class=" w-36">Account</Button>
		<DoubleArrowRight class="h-6 w-6 text-primary" />

		<Button variant={colors[2]} href="/checkout/pay" class="w-36">Payment</Button>
	</div>
{/key}

<slot />
