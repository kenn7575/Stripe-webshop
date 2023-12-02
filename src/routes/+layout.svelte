<script lang="ts">
	import { page } from '$app/stores';
	$: console.log($page);

	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Sun, Moon, GithubLogo, HamburgerMenu, Person } from 'radix-icons-svelte';
	import { toggleMode } from 'mode-watcher';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Separator } from '$lib/components/ui/separator';

	import * as Card from '$lib/components/ui/card';

	function totalPrice(items: any[]) {
		return Math.round(items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100) / 100;
	}

	let userLoggedIn = false;
	let card = {
		items: [
			{
				id: 1,
				name: 'Product 1',
				price: 100.1,
				quantity: 1
			},
			{
				id: 2,
				name: 'Product 2',
				price: 200.95,
				quantity: 1
			},
			{
				id: 3,
				name: 'Product 3',
				price: 300.3,
				quantity: 1
			}
		]
	};
</script>

<ModeWatcher />
<nav class="w-full p-4 flex justify-between">
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button size="icon" builders={[builder]} variant="outline">
				<HamburgerMenu class="h-[1.2rem] w-[1.2rem]" />
				<span class="sr-only">Open side menu</span>
			</Button>
		</Sheet.Trigger>

		<Sheet.Content side="left">
			<Sheet.Header>
				<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
				<Sheet.Description>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</Sheet.Description>
			</Sheet.Header>
			<!-- more... -->
		</Sheet.Content>
	</Sheet.Root>
	<div class="hidden md:flex gap-4">
		<Button variant="ghost" href="/">Products</Button>
		<Button variant="ghost" href="/about" class=" duration-300">About</Button>
		<Button variant="ghost" href="/support" class=" duration-300">Support</Button>
	</div>

	<div class="flex gap-2">
		<Button
			target="_blank"
			href="https://github.com/kenn7575/Stripe-webshop"
			variant="outline"
			size="icon"
		>
			<GithubLogo class="h-[1.2rem] w-[1.2rem]" />
			<span class="sr-only">Link to github repo</span>
		</Button>

		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
		<Button href="/signin" variant="secondary" class="flex gap-3">
			<Person class="h-[1.2rem] w-[1.2rem]" />
			Sign in

			<span class="sr-only">Sign in</span>
		</Button>

		<div class="group relative">
			<Button href="/checkout" class="flex gap-3 ">
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					width="23.3984"
					height="20.5762"
				>
					<g>
						<rect height="20.5762" opacity="0" width="23.3984" x="0" y="0" />
						<path
							d="M7.93945 15.8301L19.3359 15.8301C19.7168 15.8301 20.0488 15.5176 20.0488 15.0977C20.0488 14.6777 19.7168 14.3652 19.3359 14.3652L8.10547 14.3652C7.54883 14.3652 7.20703 13.9746 7.11914 13.3789L5.51758 2.50977C5.41992 1.75781 5.14648 1.37695 4.15039 1.37695L0.722656 1.37695C0.332031 1.37695 0 1.71875 0 2.10938C0 2.50977 0.332031 2.85156 0.722656 2.85156L4.02344 2.85156L5.58594 13.5742C5.79102 14.9609 6.52344 15.8301 7.93945 15.8301ZM6.14258 12.3535L19.3555 12.3535C20.7812 12.3535 21.5137 11.4746 21.7188 10.0781L22.5 4.91211C22.5195 4.78516 22.5391 4.62891 22.5391 4.54102C22.5391 4.07227 22.1875 3.75 21.6504 3.75L5.29297 3.75L5.30273 5.22461L20.8789 5.22461L20.1855 9.90234C20.1074 10.5078 19.7852 10.8887 19.209 10.8887L6.12305 10.8887ZM8.71094 20.5762C9.58984 20.5762 10.293 19.8828 10.293 18.9941C10.293 18.1152 9.58984 17.4121 8.71094 17.4121C7.82227 17.4121 7.11914 18.1152 7.11914 18.9941C7.11914 19.8828 7.82227 20.5762 8.71094 20.5762ZM17.8418 20.5762C18.7305 20.5762 19.4336 19.8828 19.4336 18.9941C19.4336 18.1152 18.7305 17.4121 17.8418 17.4121C16.9629 17.4121 16.25 18.1152 16.25 18.9941C16.25 19.8828 16.9629 20.5762 17.8418 20.5762Z"
							fill="#ffffff"
							fill-opacity="0.85"
						/>
					</g>
				</svg>
				Shopping cart

				<span class="sr-only">Cart</span>
			</Button>

			<div class="min-w-72 hidden group-hover:flex flex-col absolute right-0 transition-opacity">
				<span class="bg-transparent w-full h-4" />
				<Card.Root>
					<Card.Header>
						<Card.Title>Shopping cart</Card.Title>
						<Card.Description>You have added {card.items.length} to the cart</Card.Description>
					</Card.Header>
					<Separator />

					<Card.Content class=" mt-2">
						<p>Card Content</p>
					</Card.Content>
					<Separator />
					<Card.Footer class="mt-2">
						<div class="flex justify-between gap-2 w-full items-center">
							<p><strong>{totalPrice(card.items)} DKK</strong></p>

							<Button href="/checkout">Checkout</Button>
						</div>
					</Card.Footer>
				</Card.Root>
			</div>
		</div>
	</div>
</nav>
<Separator />
<slot />

<style>
	.min-w-72 {
		min-width: 18rem;
	}
</style>
