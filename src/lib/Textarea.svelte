<label>
	{label}

	<textarea bind:value name={label} />

	<button type="button" on:click={() => (value = '')}>Clear</button>
</label>

<script lang="ts">
	const { label } = $props<{ label: string }>()

	let value = $state('')
</script>
