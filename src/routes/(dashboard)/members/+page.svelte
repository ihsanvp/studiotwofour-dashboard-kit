<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { InviteMembersModal } from '~/components/view/invite-modal';

	interface QueryResult {
		id: string;
		email: string;
		verified: boolean;
		label?: string;
	}

	const result = useQuery<QueryResult[]>('members', async () => {
		const res = await fetch('/api/members');
		return await res.json();
	});
</script>

<div class="container mx-auto px-20 py-20">
	<div class="text-4xl">Members</div>
	<div class="flex items-end justify-between mt-5">
		<div class="text-gray-600 max-w-xl">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita laborum ad quasi error.
			Doloribus tempore quod, perferendis quasi odio illo!
		</div>
		<div>
			<InviteMembersModal users={$result.data || []}>Invite Members</InviteMembersModal>
		</div>
	</div>
	<div class="mt-5">
		{#if $result.isLoading}
			<span>Loading...</span>
		{:else if $result.error}
			<span>An error has occurred: {$result.error}</span>
		{:else if $result.data}
			<ul>
				{#each $result.data as user}
					<li class="w-full p-3 rounded bg-gray-100 mt-1 hover:bg-gray-200">
						<span>{user.email}</span>
						{#if user.label}
							<span class="text-sm bg-primary-200 text-primary-600 p-1 rounded capitalize"
								>{user.label}</span
							>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
