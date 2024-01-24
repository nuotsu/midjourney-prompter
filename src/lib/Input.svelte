<label class="grid">
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
	const { label, value: v, options } = $props<App.InputPrompt>()

	let value = $state(v)
</script>
