<script>
	import AuthGaurd from '~/components/AuthGaurd.svelte';
</script>

<AuthGaurd redirect="/login">
	<main>
		<slot />
	</main>
</AuthGaurd>
