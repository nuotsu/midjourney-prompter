<button on:click={copy} {...props}>
	{#if copied}
		✅ Copied
	{:else}
		📋 Copy
	{/if}
</button>

<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements'

	const { value, ...props } = $props<{ value: string } & HTMLButtonAttributes>()

	let copied = $state(false)

	function copy() {
		if (!value) return
		navigator.clipboard.writeText(value)
		copied = true

		const timeout = setTimeout(() => {
			copied = false
			clearTimeout(timeout)
		}, 1000)
	}
</script>
