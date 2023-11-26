<script lang="ts">
	import { loadStripe } from '@stripe/stripe-js';
	import { onMount } from 'svelte';
	import { Elements } from 'svelte-stripe';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import type { Stripe } from '@stripe/stripe-js';
	let stripe: null | Stripe = null;

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#if stripe}
	<Elements {stripe}>
		<!-- this is where your Stripe components go -->
	</Elements>
{:else}
	<p>Stripe is not loaded</p>
{/if}
