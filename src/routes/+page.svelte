<section class="grid gap-4">
	{#each $allPrompts as prompter (prompter.id)}
		<Prompter {prompter} />
	{/each}

	<nav class="flex gap-2 justify-center">
		<button class="action" on:click={newEmpty}>New empty prompt</button>
	</nav>
</section>

<script lang="ts">
	import Prompter from '$lib/Prompter.svelte'
	import { PrompterGenerator, allPrompts } from '$lib/store'

	$effect(() => {
		if (!!localStorage.getItem('allPrompts')) {
			$allPrompts = JSON.parse(localStorage.getItem('allPrompts')!)
		} else {
			$allPrompts = [new PrompterGenerator()]
		}
	})

	function newEmpty() {
		$allPrompts = [...$allPrompts, new PrompterGenerator()]
	}
</script>
