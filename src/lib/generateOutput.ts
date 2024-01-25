export default (formData: FormData) => {
	const entries = Object.entries(Object.fromEntries(formData.entries()))

	const prompts = entries
		.filter(([key]) => !key.startsWith('--'))
		.map(([, value]) => value)
		.filter(Boolean)
		.join(', ')

	const flags = entries
		.filter(([key]) => key.startsWith('--'))
		.map(([key, value]) => value && `${key} ${value}`)
		.filter(Boolean)
		.join(' ')

	return [prompts, flags].filter(Boolean).join(' ')
}
