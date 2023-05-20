<script>
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import AuthGaurd from '~/components/static/AuthGaurd.svelte';
	import Dashboard from '~/components/view/dashboard/Dashboard.svelte';

	const queryClient = new QueryClient();
</script>

<AuthGaurd redirect="/login">
	<QueryClientProvider client={queryClient}>
		<Dashboard
			links={[
				{
					href: '/',
					icon: 'tabler:chart-pie',
					label: 'Overview'
				},
				{
					href: '/members',
					icon: 'tabler:users',
					label: 'Members'
				},
				{
					href: '/ads',
					icon: 'fluent:window-ad-20-filled',
					label: 'Ad Banners'
				},
				{
					href: '/assets',
					icon: 'tabler:folders',
					label: 'Assets'
				}
			]}
		>
			<slot />
		</Dashboard>
	</QueryClientProvider>
</AuthGaurd>
