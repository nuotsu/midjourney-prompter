<div class="grid gap-2 sm:w-[300px]">
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

	{#if prompter.random}
		<button class="action" on:click={randomize}>Randomize 🤪</button>
	{/if}
</div>

<script lang="ts">
	import Copy from './Copy.svelte'
	import { PrompterGenerator } from './PrompterGenerator'
	import { allPrompts } from './store'

	const { output, prompter, onDelete, onClearAll } = $props<{
		output: string
		prompter: MP.Prompter
		onDelete: () => void
		onClearAll: () => void
	}>()

	function duplicate() {
		const index = $allPrompts.findIndex(({ id }) => id === prompter.id)

		$allPrompts = [
			...$allPrompts,
			new PrompterGenerator($allPrompts[index].segments),
		]
	}

	function remove() {
		$allPrompts = $allPrompts.filter(({ id }) => id !== prompter.id)

		onDelete()
	}

	function randomize() {
		const index = $allPrompts.findIndex(({ id }) => id === prompter.id)

		$allPrompts[index] = new PrompterGenerator().randomize()
	}
</script>
