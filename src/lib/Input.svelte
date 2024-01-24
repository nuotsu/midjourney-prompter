<fieldset class="grid">
	<div class="flex justify-between gap-4">
		<label for="{label}-{id}">{label}</label>

		{#if value}
			<button on:click={() => (value = '')}>Clear</button>
		{/if}
	</div>

	<input
		id="{label}-{id}"
		name={label}
		list="{label}-{id}-list"
		type="text"
		{...attributes}
		bind:value
	/>

	{#if options}
		<datalist id="{label}-{id}-list">
			{#each options as option}
				<option>{option}</option>
			{/each}
		</datalist>
	{/if}
</fieldset>

<script lang="ts">
	const {
		label,
		value: v,
		options,
		id,
		attributes,
	} = $props<MP.InputSegment & { id: string }>()

	let value = $state(v)
</script>
