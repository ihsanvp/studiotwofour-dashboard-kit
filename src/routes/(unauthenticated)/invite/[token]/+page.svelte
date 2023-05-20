<script lang="ts">
	import { signup } from '~/stores/auth.store';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let password: string;
	let confirmation: string;

	async function onSubmit() {
		if (password && confirmation && password == confirmation && password.length >= 8) {
			await signup(data.email, password);
			goto('/');
		} else {
			console.log('validation error', password, confirmation);
		}
	}
</script>

<div class="w-full h-screen flex items-center justify-center">
	<div class="flex flex-col items-center justify-center gap-5">
		<h1 class="text-6xl">Welcome, {data.email}</h1>
		<p class="text-2xl">Account setup</p>
		<form class="w-full max-w-2xl flex flex-col gap-3 mt-5" on:submit|preventDefault={onSubmit}>
			<label class="flex w-full flex-col text-gray-700 font-normal gap-2" for="password">
				<span>Password</span>
				<input
					class="w-full border border-primary-900 p-3 rounded active:outline-primary-500 focus:outline-primary-500"
					type="password"
					id="password"
					bind:value={password}
				/>
			</label>
			<label class="flex w-full flex-col text-gray-700 font-normal gap-2" for="password-confirm">
				<span>Confirm Password</span>
				<input
					class="w-full border border-primary-900 p-3 rounded active:outline-primary-500 focus:outline-primary-500"
					type="password"
					id="password-confirm"
					bind:value={confirmation}
				/>
			</label>
			<div class="w-full h-px border-t my-3 border-gray-200" />
			<div class="">
				<button
					type="submit"
					class="w-full bg-primary-600 text-white py-3 px-3 rounded hover:bg-primary-700"
					>Sign Up</button
				>
			</div>
		</form>
	</div>
</div>
