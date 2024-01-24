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
		}

		type SegmentDefaults = {
			readonly label: string
			value?: string
		}

		type Segment = TextareaSegment | InputSegment

		type TextareaSegment = SegmentDefaults & {
			readonly type: 'textarea'
			attributes?: Partial<HTMLTextareaAttributes>
		}

		type InputSegment = SegmentDefaults & {
			readonly type: 'input'
			readonly options?: string[]
			attributes?: Partial<HTMLInputAttributes>
		}
	}
}

export {}
