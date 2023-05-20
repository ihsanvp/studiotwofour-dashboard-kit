<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Dialog, DialogTitle } from '@rgossiaux/svelte-headlessui';
	import {
		isOpen,
		closeModal,
		fields,
		removeField,
		addField,
		resetFields,
		removeError,
		addError,
		isValidFields
	} from './store';
	import type { User } from '~/models/auth.models';

	export let users: User[];

	function validate(id: string) {
		const value = $fields.find((f) => f.id == id)?.value;

		const match = users.findIndex((f) => f.email == value);
		const test = value
			?.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);

		const ALREADY_MEMBER_ERROR = `Email address already a member`;
		const INVALID_EMAIL_ERROR = 'Invalid email address';

		if (match < 0) {
			removeError(id, ALREADY_MEMBER_ERROR);
		} else {
			addError(id, ALREADY_MEMBER_ERROR);
		}

		if (test) {
			removeError(id, INVALID_EMAIL_ERROR);
		} else {
			addError(id, INVALID_EMAIL_ERROR);
		}
	}

	async function onSubmit() {
		if ($isValidFields) {
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
		} else {
			console.log($fields);
		}
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
									on:keyup={() => validate(field.id)}
									bind:value={field.value}
								/>
							</div>
							<div class="relative px-2 py-2 h-full group text-lg">
								{#if field.errors.length}
									<Icon class="text-red-500" icon="mdi:warning-circle-outline" />
									<div
										class="hidden absolute text-gray-500 flex-col gap-2 bg-white px-5 py-3 text-sm border border-gray-300 rounded -top-2 left-8 group-hover:flex w-80 before:absolute before:w-3 before:h-3 before:bg-white before:border-b before:border-l before:border-gray-300 before:-left-1.5 before:rotate-45 before:top-4"
									>
										{#each field.errors as error}
											<div>{error}</div>
										{/each}
									</div>
								{:else}
									<Icon class="text-green-600" icon="mdi:tick" />
								{/if}
							</div>
							<button
								type="button"
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
						class="block w-full text rounded bg-primary-600 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:cursor-not-allowed hover:bg-primary-700 text-white p-2"
						disabled={!$isValidFields}
						type="submit">Send Invites</button
					>
				</div>
			</form>
		</div>
	</div>
</Dialog>
