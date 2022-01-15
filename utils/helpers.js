export function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export function curencyFormatter(amount) {
	return new Intl.NumberFormat(undefined, {
		currency: 'usd',
		style: 'currency',
		minimumFractionDigits: 0,
	}).format(amount)
}
