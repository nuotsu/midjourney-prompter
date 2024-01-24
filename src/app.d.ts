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
		type Prompt = TextareaPrompt | InputPrompt

		type TextareaPrompt = {
			type: 'textarea'
			label: string
			value?: string
		}

		type InputPrompt = {
			type: 'input'
			label: string
			value?: string
			options?: string[]
		}
	}
}

export {}
