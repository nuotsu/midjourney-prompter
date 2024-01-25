import { writable } from 'svelte/store'

export const allPrompts = writable<MP.Prompter[]>([])
