<div id={prompter.id} class="grid sm:grid-cols-[auto,1fr] gap-4 items-start">
	<div class="grid gap-4 w-[300px]">
		<output>{output}</output>

		<button on:click={copy} disabled={!output}>Copy</button>

		{#if output}
			<button on:click={duplicate}>Duplicate</button>
		{/if}

		{#if $allPrompts.length > 1}
			<button on:click={remove}>Delete</button>
		{/if}
	</div>

	<form
		class="grid grid-cols-3 gap-4 items-start"
		bind:this={form}
		on:input={generateOutput}
	>
		{#each prompter.segments as segment}
			{#if segment.type === 'textarea'}
				<Textarea {...segment} />
			{:else if segment.type === 'input'}
				<Input {...segment} />
			{/if}
		{/each}

		<button class="col-span-full" type="reset">Clear all</button>
	</form>
</div>

<script lang="ts">
	import Textarea from '$lib/Textarea.svelte'
	import Input from '$lib/Input.svelte'
	import { PrompterGenerator, allPrompts } from './store'
	import { onMount } from 'svelte'

	const { prompter, index } = $props<{
		prompter: App.Prompter
		index: number
	}>()

	let form = $state<HTMLFormElement | null>(null)
	let output = $state('')

	$effect(() => {
		form?.querySelectorAll('button')?.forEach((e) => {
			e.onclick = () => {
				form?.reset()
				generateOutput()
			}
		})
	})

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
