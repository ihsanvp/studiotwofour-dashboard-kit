<script lang="ts">
	import '~/app.css';

	import { onMount } from 'svelte';
	import { initFirebase } from '~/lib/client/firebase';
	import { auth as authStore } from '~/stores/auth.store';

	onMount(() => {
		const { auth } = initFirebase();
		return auth.onAuthStateChanged(async (user) => {
			authStore.set({
				isLoading: false,
				user:
					(user && {
						id: user.uid,
						email: user.email as string
					}) ||
					null
			});
		});
	});
</script>

<slot />
