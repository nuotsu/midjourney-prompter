import { faker } from '@faker-js/faker'

export class PrompterGenerator {
	id: string
	segments: MP.Segment[]
	random?: boolean

	constructor({
		segments = DEFAULT_SEGMENTS,
	}: {
		segments?: MP.Segment[]
	} = {}) {
		this.id = Math.random().toString(36).substring(2, 8)
		this.segments = segments

		return this
	}

	randomize(segments: MP.Segment[] = DEFAULT_SEGMENTS) {
		this.random = true

		this.segments = segments.map((segment) => {
			const fake = () => {
				switch (segment.label) {
					case 'Subject':
						const age = `${faker.number.int(100)}-year-old`
						const bio = faker.person.bio().replaceAll(/[^\w\s]/g, '')
						return `a ${age} ${faker.person.sex()} ${bio}`.trim()

					case 'Appearance':
						const adjective = faker.commerce.productAdjective().toLowerCase()
						return `wearing ${faker.color.human()} ${adjective} attire`

					case 'Activity':
						const verbing = `${faker.word.verb().replace(/e?e$/g, '')}ing`
						const noun = faker.word.noun()
						const object = noun.match(/^[aeiou]/) ? `an ${noun}` : `a ${noun}`
						return `${faker.word.adverb()} ${verbing} ${object}`

					case 'Camera':
						if (segment.type === 'input')
							return segment.options?.[
								faker.number.int(segment.options.length - 1)
							]

					case 'Location':
						return `in ${faker.location.country()}`

					case '--style':
						return 'raw'
				}
			}

			return { ...segment, value: fake() }
		})

		return this
	}
}

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
			'80s photography',
			'90s photography',
			'aerial-view drone footage',
			'deguerrotype',
			'Hasselblad',
			'low-angle photography',
		],
	},
	{
		type: 'input',
		label: '--ar',
		options: ['16:9', '2:3'],
		attributes: {
			pattern: '[0-9]{1,}:[0-9]{1,}',
		},
	},
	{
		type: 'textarea',
		label: '--no',
	},
	{
		type: 'input',
		label: '--style',
		options: ['raw'],
		value: 'raw',
	},
]
