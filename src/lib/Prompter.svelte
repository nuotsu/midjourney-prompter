<div class="grid md:grid-cols-[auto,1fr] gap-4 items-start">
	<div class="grid gap-2 w-[300px]">
		<output class="text-lightnavy font-mono">{output}</output>

		{#if output}
			<button on:click={copy}>Copy</button>
			<button on:click={duplicate}>Duplicate</button>
		{/if}

		{#if $allPrompts.length > 1}
			<button on:click={remove}>Delete</button>
		{/if}

		{#if output}
			<button form="prompter-{prompter.id}" class="col-span-full" type="reset">
				Clear all
			</button>
		{/if}
	</div>

	<form
		id="prompter-{prompter.id}"
		class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 items-start"
		bind:this={form}
		on:input={generateOutput}
	>
		{#each prompter.segments as segment}
			{#if segment.type === 'textarea'}
				<Textarea {...segment} id={prompter.id} />
			{:else if segment.type === 'input'}
				<Input {...segment} id={prompter.id} />
			{/if}
		{/each}
	</form>
</div>

<script lang="ts">
	import Textarea from '$lib/Textarea.svelte'
	import Input from '$lib/Input.svelte'
	import { PrompterGenerator, allPrompts } from './store'
	import { onMount } from 'svelte'

	const { prompter, index } = $props<{
		prompter: MP.Prompter
		index: number
	}>()

	let form = $state<HTMLFormElement | null>(null)
	let output = $state('')

	onMount(generateOutput)

	function generateOutput() {
		if (!form) return

		const formData = new FormData(form)

		$allPrompts[index] = {
			...prompter,
			segments: prompter.segments.map((segment) => ({
				...segment,
				value: formData.get(segment.label) as string,
			})),
		}

		output = Object.entries(Object.fromEntries(formData.entries()))
			.map(([key, value]) => {
				if (!value) return
				if (key.startsWith('--')) return `${key} ${value}`
				return value
			})
			.filter(Boolean)
			.join(', ')
	}

	function copy() {
		if (!output) return
		navigator.clipboard.writeText(output)
	}

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
