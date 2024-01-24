<div class="grid md:grid-cols-[auto,1fr] gap-4 items-start">
	<Actions {output} {prompter} {index} {onClearAll} />

	<form
		id="prompter-{prompter.id}"
		class="grid sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 items-start"
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
	import Actions from './Actions.svelte'
	import Textarea from '$lib/Textarea.svelte'
	import Input from '$lib/Input.svelte'
	import { allPrompts } from './store'
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

	function onClearAll() {
		form?.reset()
		form?.querySelectorAll('input, textarea').forEach((e) => {
			e.dispatchEvent(new Event('input'))
		})
		output = ''
	}

	$effect(() => {
		form?.querySelectorAll('button.warn').forEach((btn) => {
			btn.addEventListener('click', generateOutput)
		})
	})
</script>
