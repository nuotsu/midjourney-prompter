import { writable } from 'svelte/store'

export const DEFAULT_PROMPT: App.Prompt[] = [
	{
		type: 'textarea',
		label: 'Subject',
	},
	{
		type: 'textarea',
		label: 'Appearance',
	},
	{
		type: 'textarea',
		label: 'Action',
	},
	{
		type: 'textarea',
		label: 'Location',
	},
	{
		type: 'input',
		label: 'Camera',
		options: ['Hasselblad'],
	},
	{
		type: 'input',
		label: '--ar',
		options: ['16:9'],
	},
	{
		type: 'textarea',
		label: '--no',
	},
]

export const allPrompts = writable<Array<App.Prompt[]>>([DEFAULT_PROMPT])
