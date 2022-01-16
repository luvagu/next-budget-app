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

export function generateUID(length = 24) {
	const getRandomChar = (min = 65, max = 90) => {
		min = Math.ceil(min)
		max = Math.floor(max)
		const isUpperCase = Math.random()
		const character = String.fromCharCode(
			Math.floor(Math.random() * (max - min + 1) + min)
		)
		return isUpperCase > 0.5 ? character : character.toLowerCase()
	}

	const getRandomNumber = (min = 0, max = 9) => {
		min = Math.ceil(min)
		max = Math.floor(max)
		return String(Math.floor(Math.random() * (max - min + 1) + min))
	}

	let uid = '',
		counter = 1

	while (uid.length < length) {
		const picker = Math.random()
		if (picker > 0.5) {
			uid += getRandomChar()
		} else {
			uid += getRandomNumber()
		}
		if (counter > 0 && counter % 4 === 0 && uid.length < length) uid += '-'
		counter++
	}

	return uid
}
