<label for="output-{prompter.id}" class="relative text-sm">
	<output
		class="block py-2 px-4 bg-lightnavy/5 text-lightnavy font-mono rounded"
		class:glow={output}
	>
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
			class="absolute bottom-2 right-3 z-[1] transition-[opacity,translate]"
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
