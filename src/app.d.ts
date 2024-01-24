// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace App {
		type Prompter = {
			id: string
			segments: Segment[]
		}

		type Segment = TextareaSegment | InputSegment

		type TextareaSegment = {
			readonly type: 'textarea'
			readonly label: string
			value?: string
		}

		type InputSegment = {
			readonly type: 'input'
			readonly label: string
			value?: string
			readonly options?: string[]
		}
	}
}

export {}
