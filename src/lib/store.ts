import { writable } from 'svelte/store'

const DEFAULT_SEGMENTS: MP.Segment[] = [
	{
		type: 'textarea',
		label: 'Subject',
	},
	{
		type: 'textarea',
		label: 'Appearance',
		attributes: {
			placeholder: 'wearing...',
		},
	},
	{
		type: 'textarea',
		label: 'Activity',
	},
	{
		type: 'textarea',
		label: 'Location',
	},
	{
		type: 'textarea',
		label: 'Style',
		attributes: {
			placeholder: 'in the style of...',
		},
	},
	{
		type: 'input',
		label: 'Camera',
		options: [
			'Hasselblad',
			'80s photography',
			'90s photography',
			'low-angle photography',
			'aerial-view drone footage',
		],
	},
	{
		type: 'input',
		label: '--ar',
		options: ['16:9'],
		attributes: {
			pattern: '[0-9]{1,}:[0-9]{1,}',
		},
	},
	{
		type: 'textarea',
		label: '--no',
	},
]

export class PrompterGenerator {
	id: string
	segments: MP.Segment[]

	constructor(segments: MP.Segment[] = DEFAULT_SEGMENTS) {
		this.id = Math.random().toString(36).substring(2, 8)
		this.segments = segments

		return this
	}
}

export const allPrompts = writable([new PrompterGenerator()])
