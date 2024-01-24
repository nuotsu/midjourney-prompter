<div class="grid sm:grid-cols-[auto,1fr] gap-4 items-start">
	<div class="grid gap-4 w-[300px]">
		<output>{output}</output>
		<button on:click={copy} disabled={!output}>Copy</button>
		<button on:click={duplicate}>Duplicate</button>
	</div>

	<form
		class="grid grid-cols-3 gap-4 items-start"
		bind:this={form}
		on:input={generateOutput}
	>
		{#each prompts as prompt}
			{#if prompt.type === 'textarea'}
				<Textarea {...prompt} />
			{:else if prompt.type === 'input'}
				<Input {...prompt} />
			{/if}
		{/each}

		<button class="col-span-full" type="reset">Clear all</button>
	</form>
</div>

<script lang="ts">
	import Textarea from '$lib/Textarea.svelte'
	import Input from '$lib/Input.svelte'
	import { allPrompts } from './store'

	const { prompts, index } = $props<{
		prompts: App.Prompt[]
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

	function generateOutput() {
		if (!form) return

		const formData = new FormData(form)

		const newValues = prompts.map((prompt) => ({
			...prompt,
			value: formData.get(prompt.label) as string,
		}))

		$allPrompts[index] = newValues

		output = Object.entries(Object.fromEntries(formData.entries()))
			.map(([key, value]) => {
				if (!value) return
				if (key.startsWith('--')) return `${key} ${value}`
				return value
			})
			.filter(Boolean)
			.join(' ')
	}

	function copy() {
		if (!output) return
		navigator.clipboard.writeText(output)
	}

	function duplicate() {
		$allPrompts = [...$allPrompts, $allPrompts[index]]
	}
</script>
