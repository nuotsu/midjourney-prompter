/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			colors: {
				lightnavy: '#7d9ddf',
				navy: '#061434',
			},
		},
	},
	plugins: [require('@tailwindcss/container-queries')],
}
