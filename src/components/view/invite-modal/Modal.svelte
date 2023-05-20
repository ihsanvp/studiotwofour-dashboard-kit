<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Dialog, DialogTitle } from '@rgossiaux/svelte-headlessui';
	import { isOpen, closeModal, fields, removeField, addField, resetFields } from './store';

	async function onSubmit() {
		const res = await fetch('/api/members/invite', {
			method: 'POST',
			body: JSON.stringify({
				emails: $fields.map((f) => f.value)
			})
		});
		const result = await res.json();
		console.log(result);
		resetFields();
		closeModal();
	}
</script>

<Dialog class="relative z-40" open={$isOpen} on:close={closeModal}>
	<div class="fixed inset-0 flex items-center justify-center">
		<div class="absolute inset-0 bg-black opacity-10" />

		<div class="relative bg-white w-full max-w-lg rounded border border-gray-300">
			<div class="p-3 border-b flex items-center justify-between">
				<DialogTitle class="text-xl">Invite Members</DialogTitle>
				<div>
					<button class="p-2 text-lg hover:bg-gray-200 rounded" on:click={closeModal}>
						<Icon icon="mdi:close" />
					</button>
				</div>
			</div>
			<form on:submit|preventDefault={onSubmit}>
				<div class="p-3 flex flex-col gap-3 mt-3">
					{#each $fields as field}
						<div class="flex items-center justify-between gap-5">
							<div class="flex-1">
								<input
									class="px-4 py-2 border border-gray-300 rounded text-sm w-full"
									type="email"
									placeholder="Email"
									required
									bind:value={field.value}
								/>
							</div>
							<button
								class="p-2 text-lg hover:bg-gray-200 rounded"
								on:click={() => removeField(field.id)}
							>
								<Icon icon="mdi:trash-outline" />
							</button>
						</div>
					{/each}
					<div class="mt-5">
						<button
							class="block w-full text rounded bg-gray-200 hover:bg-gray-300 p-2"
							on:click={addField}>Add another email address</button
						>
					</div>
				</div>
				<div class="border-t p-3">
					<button
						class="block w-full text rounded bg-primary-600 hover:bg-primary-700 text-white p-2"
						type="submit">Send Invites</button
					>
				</div>
			</form>
		</div>
	</div>
</Dialog>
