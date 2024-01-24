import { writable } from 'svelte/store'

const DEFAULT_SEGMENTS: App.Segment[] = [
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

export class PrompterGenerator {
	id: string
	segments: App.Segment[]

	constructor(segments: App.Segment[] = DEFAULT_SEGMENTS) {
		this.id = Math.random().toString(36).substring(2, 8)
		this.segments = segments

		return this
	}
}

export const allPrompts = writable([new PrompterGenerator()])
