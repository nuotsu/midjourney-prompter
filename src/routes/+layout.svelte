<svelte:head>
	<title>{title}</title>
</svelte:head>

<header>
	<h1 class="text-center p-4">⛵️ {title}</h1>
</header>

<main class="p-4">
	<slot />
</main>

<footer
	class="flex flex-wrap max-sm:flex-col items-center justify-between gap-4 p-4 text-center text-sm text-lightnavy"
>
	<p class="max-sm:order-1">
		&copy; {new Date().getFullYear()}
		{title}
	</p>

	<nav>
		<a class="link" href="https://www.midjourney.com/imagine" target="_blank">
			Midjourney Website
		</a>
	</nav>
</footer>

<script lang="ts">
	import '../styles/app.css'

	const title = 'Midjourney Prompter'
</script>
