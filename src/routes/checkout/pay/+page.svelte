<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	console.log(PUBLIC_STRIPE_KEY, '$env/static/public');
	import { Elements, PaymentElement, LinkAuthenticationElement } from 'svelte-stripe';
	import Button from '$lib/components/ui/button/button.svelte';

	let stripe: any = null;
	let clientSecret: any = null;
	let error: any = null;
	let elements: any;
	let processing = false;

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);

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
	let theme: string | null = null;
	let variables: {};
	onMount(() => {
		//get theme from localstorage
		theme = localStorage.getItem('mode');
		if (theme == 'light') {
			variables = {
				colorPrimary: '#E11D48',
				colorBackground: '#ffffff',
				colorText: '#000000',
				colorDanger: '#7F1D1D',
				spacingUnit: '2px',
				borderRadius: '4px'
			};
		} else {
			variables = {
				colorPrimary: '#E11D48',
				colorBackground: '#27272A',
				colorText: '#ffffff',
				colorDanger: '#7F1D1D',
				spacingUnit: '2px',
				borderRadius: '4px'
			};
		}
	});
</script>

{#if error}
	<p class="error">{error.message} Please try again.</p>
{/if}
<main class="flex justify-center w-full py-32">
	{#if clientSecret && theme}
		<div class="w-[40rem] px-4">
			<Elements
				{stripe}
				{clientSecret}
				{variables}
				labels="floating"
				rules={{ '.Input': { border: 'solid 1px #0002' } }}
				bind:elements
			>
				<form on:submit|preventDefault={submit}>
					<LinkAuthenticationElement />
					<PaymentElement />

					<Button class="p-4 w-full mt-2" disabled={processing} on:click={submit}>
						{#if processing}
							Processing...
						{:else}
							Pay
						{/if}
					</Button>
				</form>
			</Elements>
		</div>
	{:else}
		Loading...
	{/if}
</main>

<style>
	.error {
		color: tomato;
		margin: 2rem 0 0;
	}
</style>
