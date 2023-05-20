<script lang="ts">
	import Modal from './Modal.svelte';
	import { openModal } from './store';
	import type { User } from '~/models/auth.models';

	export let users: User[];
</script>

<Modal {users} />
<button
	class="py-2 px-5 rounded text-white bg-primary-600 hover:bg-primary-700 text-sm"
	on:click={openModal}><slot /></button
>
