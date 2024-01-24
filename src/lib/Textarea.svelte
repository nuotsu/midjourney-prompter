<fieldset class="grid">
	<div class="flex justify-between gap-4">
		<label for="{label}-{id}">{label}</label>

		<button class="action warn" on:click={() => (value = '')} hidden={!value}>
			Clear
		</button>
	</div>

	<textarea id="{label}-{id}" name={label} {...attributes} bind:value />
</fieldset>

<script lang="ts">
	const {
		label,
		value: v,
		id,
		attributes,
	} = $props<MP.TextareaSegment & { id: string }>()

	let value = $state(v)
</script>
