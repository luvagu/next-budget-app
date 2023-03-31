export function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export function curencyFormatter(amount = 0) {
	return new Intl.NumberFormat('en-US', {
		currency: 'usd',
		style: 'currency',
		minimumFractionDigits: 0,
	}).format(Math.abs(amount))
}

export function calculatePercent(current = 0, max = 0) {
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

	let uid = ''
	let counter = 1

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

export function getFirstInitial(name = '') {
	return name.charAt(0).toUpperCase()
}

export function capitalizeWords(words = '') {
	return words
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
		.trim()
}

export function dateFormatter(timestamp = null) {
	if (!timestamp) return null

	const date = new Date(timestamp / 1000)
	const formattedDateString = new Intl.DateTimeFormat('en-GB', {
		// weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: false,
		// dayPeriod: 'short',
		// timeZone: 'America/Guayaquil',
		// timeZoneName: 'short',
	}).format(date)

	return `Updated on ${formattedDateString}`
}
