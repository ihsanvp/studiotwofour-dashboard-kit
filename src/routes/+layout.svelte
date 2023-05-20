<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import { initFirebase } from '$lib/client/firebase';
	import { auth as authStore } from '~/stores/auth';

	onMount(initFirebase);
</script>

<main>
	<code>
		{JSON.stringify($authStore)}
	</code>
	<slot />
</main>
