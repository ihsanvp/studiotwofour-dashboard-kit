<script lang="ts">
	import { goto } from '$app/navigation';
	import { login, isLoggedIn } from '~/stores/auth.store';

	let email: string;
	let password: string;

	async function onSubmit() {
		if (email && password) {
			try {
				await login(email, password);
			} catch (err) {
				console.log(err);
			}
		}
		if ($isLoggedIn) {
			goto('/');
		}
	}
</script>

<div class="pt-16">
	<div class="container mx-auto py-60">
		<div class="flex flex-col gap-8">
			<h1 class="text-4xl mb-3 font-semibold text-primary-950">Login to Studiotwofour</h1>
			<form class="flex flex-col w-full max-w-2xl gap-5" on:submit|preventDefault={onSubmit}>
				<label class="flex w-full flex-col text-gray-700 font-normal gap-2" for="email">
					<span>Email</span>
					<input
						class="w-full border border-primary-900 p-3 rounded active:outline-primary-500 focus:outline-primary-500"
						type="email"
						id="email"
						bind:value={email}
					/>
				</label>
				<label class="flex w-full flex-col text-gray-700 font-normal gap-2" for="password">
					<span>Password</span>
					<input
						class="w-full border border-primary-900 p-3 rounded active:outline-primary-500 focus:outline-primary-500"
						type="password"
						id="password"
						bind:value={password}
					/>
				</label>
				<button
					class="w-80 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded cursor-pointer font-semibold mt-3 active:outline-primary-700 focus:outline-primary-700"
					type="submit">Log In</button
				>
			</form>
		</div>
	</div>
</div>
