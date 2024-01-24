<div class="grid gap-2 w-[300px]">
	<output class="text-lightnavy font-mono">{output}</output>

	{#if output}
		<Copy value={output} />
		<button class="action" on:click={duplicate}>Duplicate</button>
	{/if}

	{#if $allPrompts.length > 1}
		<button class="action warn" on:click={remove}>Delete</button>
	{/if}

	{#if output}
		<button
			form="prompter-{prompter.id}"
			class="action warn"
			type="reset"
			on:click={onClearAll}
		>
			Clear all
		</button>
	{/if}
</div>

<script lang="ts">
	import Copy from './Copy.svelte'
	import { PrompterGenerator, allPrompts } from './store'

	const { output, prompter, index, onClearAll } = $props<{
		output: string
		prompter: MP.Prompter
		index: number
		onClearAll: () => void
	}>()

	function duplicate() {
		$allPrompts = [
			...$allPrompts,
			new PrompterGenerator($allPrompts[index].segments),
		]
	}

	function remove() {
		$allPrompts = $allPrompts.filter(({ id }) => id !== prompter.id)
	}
</script>
