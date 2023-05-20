<script lang="ts">
	import cx from 'classnames';
</script>

<div
	class={cx('', {
		'pr-96': $$slots.sidebar
	})}
>
	<slot />
</div>
{#if $$slots.sidebar}
	<aside class="fixed right-0 bottom-0 top-16 border-l border-gray-300 w-96">
		<slot name="sidebar" />
	</aside>
{/if}
