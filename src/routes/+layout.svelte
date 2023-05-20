<script lang="ts">
	import '~/app.css';

	import { onMount } from 'svelte';
	import { initFirebase } from '~/lib/client/firebase';
	import { auth as authStore } from '~/stores/auth.store';

	onMount(() => {
		const { auth } = initFirebase();
		const unSubscribeTokenChange = auth.onIdTokenChanged(async (user) => {
			const token = await user?.getIdToken();
			if (token) {
				await fetch('/api/session', {
					method: 'POST',
					body: JSON.stringify({ token })
				});
			}
		});
		const unSubscribeAuthChange = auth.onAuthStateChanged(async (user) => {
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

		return () => {
			unSubscribeTokenChange();
			unSubscribeAuthChange();
		};
	});
</script>

<slot />
