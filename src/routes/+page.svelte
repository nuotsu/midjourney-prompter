<svelte:head>
	<title>Midjourney Prompter</title>
</svelte:head>

<section class="grid gap-4">
	{#each $allPrompts as prompter, index (prompter.id)}
		<Prompter {prompter} {index} />
	{/each}

	<nav class="flex gap-2 justify-center">
		<button class="action" on:click={newEmpty}>New empty prompt</button>
	</nav>
</section>

<script>
	import Prompter from '$lib/Prompter.svelte'
	import { PrompterGenerator, allPrompts } from '$lib/store'

	function newEmpty() {
		$allPrompts = [...$allPrompts, new PrompterGenerator()]
	}
</script>
