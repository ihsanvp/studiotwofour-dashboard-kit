<script lang="ts">
	import logoImg from '~/assets/images/logo.png';
	import { isLoggedIn } from '~/stores/auth.store';
	import AccountMenu from './AccountMenu.svelte';
</script>

<nav
	class="fixed top-0 left-0 right-0 h-16 border-b border-gray-300 bg-white z-20 flex justify-between"
>
	<div class="h-full flex items-center justify-center gap-5 px-5">
		<img class="w-10 h-10 object-contain" src={logoImg} alt="logo" />
		<div class="font-semibold text-primary-900 uppercase tracking-widest">Studiotwofour</div>
	</div>

	{#if $isLoggedIn}
		<div class="h-full flex items-center justify-center gap-5 px-10">
			<AccountMenu />
		</div>
	{/if}
</nav>
