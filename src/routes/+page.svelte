<svelte:head>
	<title>Midjourney Prompter</title>
</svelte:head>

{#each $allPrompts as prompter, index (prompter.id)}
	<Prompter {prompter} {index} />
{/each}

<nav>
	<button on:click={newEmpty}>New empty prompt</button>
</nav>

<script>
	import Prompter from '$lib/Prompter.svelte'
	import { PrompterGenerator, allPrompts } from '$lib/store'

	function newEmpty() {
		$allPrompts = [...$allPrompts, new PrompterGenerator()]
	}
</script>
