<svelte:head>
	<title>Midjourney Prompter</title>
</svelte:head>

{#each $allPrompts as prompts, index (index)}
	<Prompter {prompts} {index} />
{/each}

<nav>
	<button on:click={newEmpty}>New empty prompt</button>
</nav>

<script>
	import Prompter from '$lib/Prompter.svelte'
	import { DEFAULT_PROMPT, allPrompts } from '$lib/store'

	function newEmpty() {
		$allPrompts = [...$allPrompts, DEFAULT_PROMPT]
	}
</script>
