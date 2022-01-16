export function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export function curencyFormatter(amount) {
	return new Intl.NumberFormat('en-US', {
		currency: 'usd',
		style: 'currency',
		minimumFractionDigits: 0,
	}).format(amount)
}

export function calculatePercent(current, max) {
	const percent = Number(Number.parseFloat((current / max) * 100).toFixed(2))
	return percent > 100 ? 100 : percent
}
