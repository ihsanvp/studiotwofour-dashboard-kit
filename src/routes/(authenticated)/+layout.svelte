<script>
	import AuthGaurd from '~/components/static/AuthGaurd.svelte';
	import Dashboard from '~/components/view/dashboard/Dashboard.svelte';
</script>

<AuthGaurd redirect="/login">
	<Dashboard
		links={[
			{
				href: '/',
				icon: 'tabler:chart-pie',
				label: 'Overview'
			},
			{
				href: '/users',
				icon: 'tabler:users',
				label: 'Users'
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
</AuthGaurd>
