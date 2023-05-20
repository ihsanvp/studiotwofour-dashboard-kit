<script>
	import Modal from './Modal.svelte';
	import { openModal } from './store';
</script>

<Modal />
<button
	class="py-2 px-5 rounded text-white bg-primary-600 hover:bg-primary-700 text-sm"
	on:click={openModal}><slot /></button
>
