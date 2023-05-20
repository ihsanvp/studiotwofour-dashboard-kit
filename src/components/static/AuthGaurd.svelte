<script lang="ts">
	import { auth, isLoggedIn } from '~/stores/auth.store';
	import Redirect from '~/components/static/Redirect.svelte';

	export let redirect: string | undefined = undefined;
</script>

{#if $auth.isLoading}
	<div>Loading...</div>
{:else if $isLoggedIn}
	<slot />
{:else if redirect}
	<Redirect path={redirect} />
{:else}
	Unauthenticated
{/if}
