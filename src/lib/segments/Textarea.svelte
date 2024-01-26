<Segment id="{label}-{id}" {label} {value} on:click={() => (value = '')}>
	<textarea
		class="input"
		id="{label}-{id}"
		name={label}
		rows={3}
		{...attributes}
		bind:value
	/>
</Segment>

<script lang="ts">
	import Segment from './Segment.svelte'

	let {
		label,
		value: v,
		id,
		attributes,
	} = $props<MP.TextareaSegment & { id: string }>()

	let value = $state(v)
</script>
