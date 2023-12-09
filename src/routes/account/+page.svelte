<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import { user } from '$lib/functions/firebase';
</script>

<h1>Hello user</h1>
{JSON.stringify($user)}
