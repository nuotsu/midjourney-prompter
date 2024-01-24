<fieldset class="grid">
	<div class="flex justify-between gap-4">
		<label for="{label}-{id}">{label}</label>

		<button
			class="action warn"
			on:click={() => (value = '')}
			hidden={!value || !output}
		>
			Clear
		</button>
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
		output,
	} = $props<
		MP.InputSegment & {
			id: string
			output: string
		}
	>()

	let value = $state(v)
</script>
