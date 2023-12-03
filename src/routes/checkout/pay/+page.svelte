<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	console.log(PUBLIC_STRIPE_KEY, '$env/static/public');

	import { Elements, PaymentElement, LinkAuthenticationElement, Address } from 'svelte-stripe';
	import Button from '$lib/components/ui/button/button.svelte';

	let stripe: any = null;
	let clientSecret: any = null;
	let error: any = null;
	let elements: any;
	let processing = false;

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);

		// create payment intent server side
		clientSecret = await createPaymentIntent();
	});

	async function createPaymentIntent() {
		const response = await fetch('/api/stripe/payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({})
		});
		const { clientSecret } = await response.json();

		return clientSecret;
	}

	async function submit() {
		// avoid processing duplicates
		if (processing) return;

		processing = true;

		// confirm payment with stripe
		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		// log results, for debugging
		console.log({ result });

		if (result.error) {
			// payment failed, notify user
			error = result.error;
			processing = false;
		} else {
			// payment succeeded, redirect to "thank you" page
			goto('/thanks');
		}
	}
</script>

<h1>Payment Element Example</h1>

<nav>
	<a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-element"
		>View code</a
	>
</nav>

{#if error}
	<p class="error">{error.message} Please try again.</p>
{/if}

{#if clientSecret}
	<Elements
		{stripe}
		{clientSecret}
		theme="stripe"
		labels="floating"
		rules={{ '.Input': { border: 'solid 1px #0002' } }}
		bind:elements
	>
		<form on:submit|preventDefault={submit}>
			<LinkAuthenticationElement />
			<PaymentElement />

			<Button class="p-4" disabled={processing}>
				{#if processing}
					Processing...
				{:else}
					Pay
				{/if}
			</Button>
		</form>
	</Elements>
{:else}
	Loading...
{/if}

<style>
	.error {
		color: tomato;
		margin: 2rem 0 0;
	}
</style>
