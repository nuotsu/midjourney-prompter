<label for="output-{prompter.id}" class="relative text-sm">
	<output class="text-lightnavy font-mono" class:glow={output}>
		{#if output}
			{output}
		{:else}
			Start typing...
			<span class="inline-block max-md:rotate-90">
				<span class="inline-block point">👉</span>
			</span>
		{/if}
	</output>

	{#if output}
		<Copy
			id="output-{prompter.id}"
			class="absolute bottom-0 right-0 z-[1] transition-[opacity,translate]"
			value={output}
		/>
	{/if}
</label>

<style lang="postcss">
	.glow {
		text-shadow: 0 0 0.5em theme('colors.lightnavy');
	}

	.point {
		animation: point 0.6s ease-in-out infinite alternate;
	}

	@keyframes point {
		to {
			translate: 0.25em 0;
		}
	}

	@media (pointer: fine) {
		label:not(:hover) :global(button) {
			pointer-events: none;
			opacity: 0;
			translate: 1em 0;
		}
	}
</style>

<script lang="ts">
	import Copy from './Copy.svelte'

	let { output, prompter } = $props<{
		output: string
		prompter: MP.Prompter
	}>()
</script>
