<div class="@container grid gap-4 md:w-[300px] md:sticky top-4">
	<Output {output} {prompter} />

	<div class="grid gap-2 @xs:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
		{#if output}
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
				on:click={() => {
					confirm('Are you sure you want to clear all?') && onClearAll()
				}}
			>
				Clear all
			</button>
		{/if}

		{#if prompter.random}
			<button class="action" on:click={randomize}>Randomize 🤪</button>
		{/if}
	</div>
</div>

<script lang="ts">
	import Output from './Output.svelte'
	import { PrompterGenerator } from './PrompterGenerator'
	import { allPrompts } from './store'

	let { output, prompter, onDelete, onClearAll } = $props<{
		output: string
		prompter: MP.Prompter
		onDelete: () => void
		onClearAll: () => void
	}>()

	function duplicate() {
		const index = $allPrompts.findIndex(({ id }) => id === prompter.id)

		$allPrompts = [
			...$allPrompts,
			new PrompterGenerator({ segments: $allPrompts[index].segments }),
		]
	}

	function remove() {
		$allPrompts = $allPrompts.filter(({ id }) => id !== prompter.id)

		onDelete()
	}

	function randomize() {
		const index = $allPrompts.findIndex(({ id }) => id === prompter.id)

		console.log(prompter.id)

		$allPrompts[index] = new PrompterGenerator().randomize()
	}
</script>
