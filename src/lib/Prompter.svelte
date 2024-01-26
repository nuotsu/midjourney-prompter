<div class="grid md:grid-cols-[auto,1fr] gap-x-6 gap-y-4 items-start anim-fade">
	<Actions {output} {prompter} onDelete={handleInput} {onClearAll} />

	<form
		id="prompter-{prompter.id}"
		class="grid sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 items-start"
		bind:this={form}
		on:input={handleInput}
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
	import generateOutput from './generateOutput'

	const { prompter } = $props<{ prompter: MP.Prompter }>()

	let form = $state<HTMLFormElement | null>(null)
	let output = $state('')

	$effect(() => {
		form?.querySelectorAll('fieldset button').forEach((btn) => {
			btn.addEventListener('click', handleInput)
		})
	})

	onMount(handleInput)

	function handleInput() {
		if (!form) return

		const formData = new FormData(form)
		const index = $allPrompts.findIndex(({ id }) => id === prompter.id)

		$allPrompts[index] = {
			...prompter,
			segments: prompter.segments.map((segment) => ({
				...segment,
				value: formData.get(segment.label) as string,
			})),
		}

		output = generateOutput(formData)

		localStorage.setItem('allPrompts', JSON.stringify($allPrompts))
	}

	function onClearAll() {
		form?.reset()
		form?.querySelectorAll('input, textarea').forEach((e) => {
			e.dispatchEvent(new Event('input'))
		})
		handleInput()
	}
</script>
