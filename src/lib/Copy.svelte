<button class="action" on:click={copy}>Copy</button>

<script lang="ts">
	const { value } = $props<{
		value: string
	}>()

	function copy() {
		if (!value) return
		navigator.clipboard.writeText(value)
	}
</script>
