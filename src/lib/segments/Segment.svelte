<fieldset class="grid">
	<div class="flex justify-between gap-4">
		<label for={id}>{label}</label>

		<button
			class="text-xs transition-[opacity,translate] hover:text-red-600"
			on:click
			hidden={!value}
		>
			Clear
		</button>
	</div>

	{@render children()}
</fieldset>

<style>
	@media (pointer: fine) {
		fieldset:not(:hover) :global(button) {
			pointer-events: none;
			opacity: 0;
			translate: 1em 0;
		}
	}
</style>

<script lang="ts">
	let { id, label, value, children } = $props<{
		id: string
		label: string
		value?: string
		children: () => any
	}>()
</script>
