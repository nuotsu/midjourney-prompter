<section class="grid gap-4">
	{#each $allPrompts as prompter (prompter.id)}
		<Prompter {prompter} />
		<hr />
	{/each}

	<nav class="flex gap-2 justify-center">
		<button class="action" on:click={newEmpty}>New empty prompt</button>
		<button class="action" on:click={newRandom}>New random prompt 🤪</button>
	</nav>
</section>

<script lang="ts">
	import Prompter from '$lib/Prompter.svelte'
	import { allPrompts } from '$lib/store'
	import { PrompterGenerator } from '$lib/PrompterGenerator'

	$effect(() => {
		if (!!localStorage.getItem('allPrompts')) {
			$allPrompts = JSON.parse(localStorage.getItem('allPrompts')!)
		} else {
			$allPrompts = [new PrompterGenerator().randomize()]
		}
	})

	function newEmpty() {
		$allPrompts = [...$allPrompts, new PrompterGenerator()]
	}

	function newRandom() {
		$allPrompts = [...$allPrompts, new PrompterGenerator().randomize()]
	}
</script>
