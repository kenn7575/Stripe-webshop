<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<main class="px-32 pt-8">
	<div class="g w-full grid gap-4">
		<Card.Root>
			<Card.Header>
				<Card.Title>Q & A</Card.Title>
				<Card.Description>Frequenly asked questions.</Card.Description>
			</Card.Header>
			<Card.Content>content</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Refund</Card.Title>
				<Card.Description>Request a refund.</Card.Description>
			</Card.Header>
			<Card.Content>content</Card.Content>
		</Card.Root><Card.Root>
			<Card.Header>
				<Card.Title>Support email</Card.Title>
				<Card.Description>Contact email support.</Card.Description>
			</Card.Header>
			<Card.Content>content</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Cookie policy</Card.Title>
				<Card.Description>Recall your consent or view how we use your cookies.</Card.Description>
			</Card.Header>
			<Card.Content>content</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Privacy policy</Card.Title>
				<Card.Description>Delete account, and more.</Card.Description>
			</Card.Header>
			<Card.Content>content</Card.Content>
		</Card.Root><Card.Root>
			<Card.Header>
				<Card.Title></Card.Title>
				<Card.Description>Deploy your new project in one-click.</Card.Description>
			</Card.Header>
			<Card.Content>content</Card.Content>
		</Card.Root>
	</div>
</main>

<style>
	.g {
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	}
</style>
