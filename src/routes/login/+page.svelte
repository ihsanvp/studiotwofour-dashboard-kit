<script lang="ts">
	import { AuthActions } from '~/stores/auth';
	import { goto } from '$app/navigation';

	let email: string;
	let password: string;

	async function onSubmit() {
		if (email && password) {
			try {
				await AuthActions.login(email, password);
				await goto('/');
			} catch (err) {
				console.log(err);
			}
		}
	}
</script>

<div class="w-full h-screen flex flex-col items-center justify-center">
	<h1 class="text-4xl mb-3">Login</h1>
	<form class="flex flex-col" on:submit|preventDefault={onSubmit}>
		<label for="email">
			<input class="border" type="email" id="email" placeholder="Email" bind:value={email} />
		</label>
		<label for="password">
			<input
				class="border"
				type="password"
				id="password"
				placeholder="Password"
				bind:value={password}
			/>
		</label>
		<button type="submit">Submit</button>
	</form>
</div>
