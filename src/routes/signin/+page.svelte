<script lang="ts">
	export let data: PageData;

	//types
	import type { PageData } from './$types';
	import type Stripe from 'stripe';

	//functionality
	import { firebaseAuth, signOutUser, user } from '$lib/functions/firebase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		signInWithPopup,
		GoogleAuthProvider,
		GithubAuthProvider,
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';

	//ui
	import { GithubLogo } from 'radix-icons-svelte';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';

	//state
	let email = '';
	let password = '';
	let errorMessage = '';
	let exeptTerms = false;

	//logic
	async function authenticateIdToken(userCredential: UserCredential | void) {
		if (!userCredential) return;
		const idToken = await userCredential.user.getIdToken();
		const res = await fetch('/api/firebase/admin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ idToken })
		});
		if (res.ok) {
			const redirectTo = $page.url.searchParams.get('redirect');
			if (redirectTo) {
				goto('/' + redirectTo.slice(1));
			} else {
				goto('/');
			}
		} else {
			signOutUser();
			goto('/sorry');
		}
	}
	async function createAccount(userCredential: UserCredential) {
		const res = await fetch('/api/stripe/customer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...userCredential.user })
		});
		if (!res.ok) {
			errorMessage = 'An error accured while creating your account in firebase and stripe. ';
			return;
		}
		const customer = (await res.json()) as Stripe.Customer;
		console.log(customer.id, 'stripe user id');
	}
	async function passwordSignup() {
		if (!email || !password) {
			errorMessage = 'Missing email or password';
			return;
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);

			authenticateIdToken(userCredential);
		} catch (error) {
			errorMessage = error.message;
		}
	}

	async function passwordSignin() {
		try {
			const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
			createAccount(userCredential);
			authenticateIdToken(userCredential);
		} catch (error) {
			errorMessage = error.message;
		}
	}
	async function googleSignin() {
		try {
			const provider = new GoogleAuthProvider();
			const userCredential = await signInWithPopup(firebaseAuth, provider);
			createAccount(userCredential);
			authenticateIdToken(userCredential);
		} catch (error) {
			errorMessage = error.message;
		}
	}
	async function githubSignin() {
		try {
			const provider = new GithubAuthProvider();
			const userCredential = await signInWithPopup(firebaseAuth, provider);
			createAccount(userCredential);
			authenticateIdToken(userCredential);
		} catch (error) {
			errorMessage = error.message;
		}
	}
	function reset() {
		errorMessage = '';

		email = '';
		password = '';
	}
</script>

<main class="mt-32 w-full flex justify-center items-center">
	<Tabs.Root value="create" class="w-[400px]">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger on:click={reset} value="create">Create account</Tabs.Trigger>
			<Tabs.Trigger on:click={reset} value="signin">Sign in</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="create">
			<Card.Root class="w-full">
				<form on:submit={passwordSignup}>
					<Card.Header class="space-y-1">
						<Card.Title class="text-2xl">Create an account</Card.Title>
						<Card.Description>Enter your email below to create your account</Card.Description>
					</Card.Header>
					<Card.Content class="grid gap-4">
						<div class="grid grid-cols-2 gap-6">
							<Button on:click={githubSignin} variant="outline">
								<GithubLogo class="h-[1.2rem] w-[1.2rem] mr-2" />
								Github
							</Button>
							<Button on:click={googleSignin} variant="outline">
								<svg class="h-[1.2rem] w-[1.2rem] mr-2" role="img" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
									/>
								</svg>
								Google
							</Button>
						</div>
						{#if errorMessage}
							<p
								class="text-destructive-foreground bg-destructive/80 p-4 rounded-md border-destructive border text-sm"
							>
								{errorMessage}
							</p>
						{/if}
						<div class="relative">
							<div class="absolute inset-0 flex items-center">
								<span class="w-full border-t" />
							</div>
							<div class="relative flex justify-center text-xs uppercase">
								<span class="bg-card px-2 text-muted-foreground"> Or continue with </span>
							</div>
						</div>
						<div class="grid gap-2">
							<Label for="email">Email</Label>
							<Input autocomplete="on" bind:value={email} id="email-signup" type="email" />
						</div>
						<div class="grid gap-2">
							<Label for="password">Password</Label>
							<Input autocomplete="on" bind:value={password} id="password-signup" type="password" />
						</div>
					</Card.Content>
					<Card.Footer>
						<div class="flex flex-col">
							<div class="flex">
								<div class="flex items-center space-x-2">
									<Checkbox id="terms" bind:checked={exeptTerms} />
									<Label
										for="terms"
										class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Accept terms and conditions
									</Label>
								</div>
								<Dialog.Root>
									<Dialog.Trigger asChild let:builder>
										<Button builders={[builder]} variant="link" class="text-foreground underline"
											>Read more.</Button
										>
									</Dialog.Trigger>
									<Dialog.Content class="">
										<Dialog.Header>
											<Dialog.Title>Tearms of conditions</Dialog.Title>
											<Dialog.Description>
												Welcome to webshop.kennik.dk! By creating an account, you acknowledge and
												agree to the following:
											</Dialog.Description>
										</Dialog.Header>
										<ul
											class="list-none mt-8 max-h-96 overflow-y-auto
										
										"
										>
											<li>
												<h2 class="font-bold text-lg mb-2">1. Data Collection and Usage:</h2>
												<p class="ml-4">
													In order to provide you with the best possible experience on
													webshop.Kennik.dk, we collect and store personal information that you
													voluntarily provide during the account creation process, and while
													reacting with elements on the website.
												</p>
											</li>
											<li class="mt-4">
												<h2 class="font-bold text-lg mb-2">2. Types of Personal Information:</h2>
												<p class="ml-4">
													The personal information we collect may include, but is not limited to,
													your name, email address, purchases, google and github user information,
													and any other information necessary for the proper functioning of the
													website.
												</p>
											</li>
											<li class="mt-4">
												<h2 class="font-bold text-lg mb-2">3. Purpose of Data Storage:</h2>
												<p class="ml-4">
													Your personal information is stored securly on Firebase and Stripe to
													facilitate your access to webshop.Kennik.dk and its features, personalize
													your experience, and communicate with you as necessary.
												</p>
											</li>
											<li class="mt-4">
												<h2 class="font-bold text-lg mb-2">4. Security Measures:</h2>
												<p class="ml-4">
													We take the security of your personal information seriously.
													webshop.Kennik.dk employs industry-standard security measures to protect
													your data from unauthorized access, disclosure, alteration, and
													destruction.
												</p>
											</li>

											<li class="mt-4">
												<h2 class="font-bold text-lg mb-2">5. Third-Party Services:</h2>
												<p class="ml-4">
													webshop.Kennik.dk use third-party services for analytics and prosseccing
													payments. These services may also collect and store your personal
													information. Please review their privacy policies for more information.
													third-partys include Firebase, Stripe, Google and vercel.
												</p>
											</li>
											<li class="mt-4">
												<h2 class="font-bold text-lg mb-2">6. Opt-Out Option:</h2>
												<p class="ml-4">
													You have the right to opt-out of certain data collection and storage by
													adjusting your account settings. However, please note that this WILL
													impact your ability to use certain features of webshop.Kennik.dk.
													Furthermore, you will loose access to previous purchases.
												</p>
											</li>
											<li class="mt-4">
												<h2 class="font-bold text-lg mb-2">7. Data Retention:</h2>
												<p class="ml-4">
													We will retain your personal information for as long as necessary to
													fulfill the purposes outlined in this consent statement or as required by
													applicable laws and regulations. If you wish to delete your account, visit
													the <a class="underline" href="/support">support page</a>.
												</p>
											</li>
											<li class="mt-4">
												<h2 class="font-bold text-lg mb-2">8. Changes to this Consent:</h2>
												<p class="ml-4">
													webshop.Kennik.dk reserves the right to update this user consent
													statement. Any changes will be communicated to you through the email.
												</p>
											</li>
										</ul>
									</Dialog.Content>
								</Dialog.Root>
							</div>
							{#if exeptTerms}
								<Button on:click={passwordSignup} class="w-full mt-2">Create account</Button>
							{:else}
								<Button disabled class="w-full mt-2">Create account</Button>
							{/if}
						</div>
					</Card.Footer>
				</form>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="signin">
			<Card.Root class="w-full">
				<form on:submit={passwordSignin}>
					<Card.Header class="space-y-1">
						<Card.Title class="text-2xl">Sign in</Card.Title>
						<Card.Description
							>Sign in with google or github. Or use email and password.</Card.Description
						>
					</Card.Header>
					<Card.Content class="grid gap-4">
						<div class="grid grid-cols-2 gap-6">
							<Button on:click={githubSignin} variant="outline">
								<GithubLogo class="h-[1.2rem] w-[1.2rem] mr-2" />
								Github
							</Button>
							<Button on:click={googleSignin} variant="outline">
								<svg class="h-[1.2rem] w-[1.2rem] mr-2" role="img" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
									/>
								</svg>
								Google
							</Button>
						</div>
						{#if errorMessage}
							<p
								class="text-destructive-foreground bg-destructive/80 p-4 rounded-md border-destructive border text-sm"
							>
								{errorMessage}
							</p>
						{/if}

						<div class="relative">
							<div class="absolute inset-0 flex items-center">
								<span class="w-full border-t" />
							</div>
							<div class="relative flex justify-center text-xs uppercase">
								<span class="bg-card px-2 text-muted-foreground"> Or continue with </span>
							</div>
						</div>
						<div class="grid gap-2">
							<Label for="email">Email</Label>
							<Input autocomplete="on" bind:value={email} id="email-signin" type="email" />
						</div>
						<div class="grid gap-2">
							<Label for="password">Password</Label>
							<Input autocomplete="on" bind:value={password} id="password-signin" type="password" />
						</div>
						<Button
							href="/signin/forgotten-password"
							variant="link"
							class="text-foreground/60 underline">I forgot my password</Button
						>
					</Card.Content>
					<Card.Footer>
						<Button on:click={passwordSignin} class="w-full">Sign in</Button>
					</Card.Footer>
				</form>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</main>
