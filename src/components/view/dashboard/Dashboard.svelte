<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';

	export let links: ComponentProps<Sidebar>['links'];
</script>

<Header />
<Sidebar {links} />
<main class="pt-16 pl-64">
	<slot />
</main>
