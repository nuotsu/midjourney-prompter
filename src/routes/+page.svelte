<svelte:head>
	<title>Midjourney Prompter</title>
</svelte:head>

<output>{output}</output>
<button on:click={copy}>Copy</button>

<form class="grid" bind:this={form} on:input={onInput}>
	<Textarea label="Subject" />
	<Textarea label="Appearance" />
	<Textarea label="Action" />
	<Textarea label="Location" />
	<Input label="Camera" options={['Hasselblad']} />
	<Input label="--ar" options={['16:9']} />
	<Textarea label="--no" />

	<button type="reset">Clear</button>
</form>

<script lang="ts">
	import Textarea from '$lib/Textarea.svelte'
	import Input from '$lib/Input.svelte'

	let form: HTMLFormElement
	let output: string

	$: form?.querySelectorAll('button')?.forEach((btn) => {
		btn.addEventListener('click', onInput)
	})

	function onInput() {
		const data = new FormData(form)
		const entries = Object.entries(Object.fromEntries(data.entries()))

		output = entries
			.map(([key, value]) => {
				if (!value) return
				if (key.startsWith('--')) return `${key} ${value}`
				return value
			})
			.join(' ')
	}

	function copy() {
		if (!output) return
		navigator.clipboard.writeText(output)
	}
</script>
