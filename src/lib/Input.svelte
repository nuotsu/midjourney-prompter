<label>
	{label}
	<input name={label} list="{label} list" type="text" bind:value />

	{#if options}
		<datalist id="{label} list">
			{#each options as option}
				<option>{option}</option>
			{/each}
		</datalist>
	{/if}

	<button on:click={() => (value = '')}>Clear</button>
</label>

<script lang="ts">
	const { label, options } = $props<{
		label: string
		options?: string[]
	}>()

	let value = $state('')
</script>
