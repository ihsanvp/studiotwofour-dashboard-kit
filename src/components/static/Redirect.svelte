<script lang="ts">
	import { goto } from '$app/navigation';

	export let path: string;
	export let replace = false;

	if (replace) {
		goto(path, {
			replaceState: true
		});
	} else {
		goto(path);
	}
</script>
