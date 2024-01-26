<Segment id="{label}-{id}" {label} {value} on:click={() => (value = '')}>
	<input
		class="input"
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
</Segment>

<script lang="ts">
	import Segment from './Segment.svelte'

	let {
		label,
		value: v,
		options,
		id,
		attributes,
	} = $props<MP.InputSegment & { id: string }>()

	let value = $state(v)
</script>
