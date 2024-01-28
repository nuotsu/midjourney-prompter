<fieldset class="grid">
	<div class="flex items-center justify-between gap-4 mb-1 text-xs">
		<label for={id} class="grow text-lightnavy">
			{label}
		</label>

		<button
			class="transition-[opacity,translate] hover:text-red-600"
			type="button"
			on:click
			hidden={!value}
		>
			Clear
		</button>
	</div>

	{@render children()}
</fieldset>

<style>
	fieldset:hover :global(.input) {
		@apply border-lightnavy;
	}

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
