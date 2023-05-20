<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		const res = await fetch('/api/users');
		const users = await res.json();

		console.log(users);
	});
</script>

Users
