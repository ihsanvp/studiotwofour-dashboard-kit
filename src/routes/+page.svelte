<script>
	import { AuthActions } from '~/stores/auth';
</script>

<h1 class="text-red-500">Welcome to SvelteKit</h1>
<button on:click={AuthActions.logout}>Logout</button>
