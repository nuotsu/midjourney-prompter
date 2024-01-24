<label class="grid">
	{label}

	<textarea bind:value name={label} />

	<button type="button" on:click={() => (value = '')}>Clear</button>
</label>

<script lang="ts">
	const { label, value: v } = $props<App.TextareaPrompt>()

	let value = $state(v)
</script>
