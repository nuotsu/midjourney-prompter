// See https://kit.svelte.dev/docs/types#app

import type {
	HTMLInputAttributes,
	HTMLTextareaAttributes,
} from 'svelte/elements'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace MP {
		type Prompter = {
			id: string
			segments: Segment[]
			random?: boolean
		}

		type SegmentDefaults = {
			readonly label: string
			value?: string
		}

		type Segment = TextareaSegment | InputSegment

		type TextareaSegment = SegmentDefaults &
			Readonly<{
				type: 'textarea'
				attributes?: Partial<HTMLTextareaAttributes>
			}>

		type InputSegment = SegmentDefaults &
			ReadOnly<{
				type: 'input'
				options?: string[]
				attributes?: Partial<HTMLInputAttributes>
			}>
	}
}

export {}
