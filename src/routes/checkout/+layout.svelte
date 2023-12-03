<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { DoubleArrowRight } from 'radix-icons-svelte';

	export let data: LayoutData;
	import Button from '$lib/components/ui/button/button.svelte';
	$: url = $page.url.pathname;

	enum Color {
		secondary = 'secondary',
		ghost = 'ghost'
	}

	$: color1 = url == '/checkout' ? Color.secondary : Color.ghost;
	$: color2 = url == '/checkout/account' ? Color.secondary : Color.ghost;
	$: color3 = url == '/checkout/pay' ? Color.secondary : Color.ghost;
</script>

{#key url}
	<div class="flex items-center gap-4 justify-center mt-4">
		<Button variant={color1} href="/checkout" class=" w-36">Shopping cart</Button>
		<DoubleArrowRight class="h-6 w-6 " />

		<Button variant={color2} href="/checkout/account" class=" w-36">Account</Button>
		<DoubleArrowRight class="h-6 w-6 " />

		<Button variant={color3} href="/checkout/pay" class="w-36">Payment</Button>
	</div>
{/key}

<slot />
