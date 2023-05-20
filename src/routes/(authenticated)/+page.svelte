<script lang="ts">
	import { logout } from '~/stores/auth.store';
</script>

<h1 class="text-red-500">Welcome to SvelteKit</h1>
<a href="/login">Login</a>
<button on:click={logout}>Logout</button>
