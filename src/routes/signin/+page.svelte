<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import { GithubLogo } from 'radix-icons-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Tabs from '$lib/components/ui/tabs';
</script>

<main class="mt-32 w-full flex justify-center items-center">
	<Tabs.Root value="create" class="w-[400px]">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="create">Create account</Tabs.Trigger>
			<Tabs.Trigger value="signin">Sign in</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="create">
			<Card.Root class="w-full">
				<Card.Header class="space-y-1">
					<Card.Title class="text-2xl">Create an account</Card.Title>
					<Card.Description>Enter your email below to create your account</Card.Description>
				</Card.Header>
				<Card.Content class="grid gap-4">
					<div class="grid grid-cols-2 gap-6">
						<Button variant="outline">
							<GithubLogo class="h-[1.2rem] w-[1.2rem] mr-2" />
							Github
						</Button>
						<Button variant="outline">
							<svg class="h-[1.2rem] w-[1.2rem] mr-2" role="img" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								/>
							</svg>
							Google
						</Button>
					</div>
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
						<Input id="email" type="email" placeholder="m@example.com" />
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input id="password" type="password" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button class="w-full">Create account</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="signin">
			<Card.Root class="w-full">
				<Card.Header class="space-y-1">
					<Card.Title class="text-2xl">Sign in</Card.Title>
					<Card.Description
						>Sign in with google or github. Or use email and password.</Card.Description
					>
				</Card.Header>
				<Card.Content class="grid gap-4">
					<div class="grid grid-cols-2 gap-6">
						<Button variant="outline">
							<GithubLogo class="h-[1.2rem] w-[1.2rem] mr-2" />
							Github
						</Button>
						<Button variant="outline">
							<svg class="h-[1.2rem] w-[1.2rem] mr-2" role="img" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								/>
							</svg>
							Google
						</Button>
					</div>
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
						<Input id="email" type="email" placeholder="m@example.com" />
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input id="password" type="password" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button class="w-full">Create account</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</main>