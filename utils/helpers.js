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
		.map(word =>
			word
				.split('')
				.map((str, idx, arr) => {
					const regex = /\W/
					const found = str.match(regex)
					const nextIdx = idx + 1

					if (found && nextIdx < arr.length) {
						arr[nextIdx] = arr[nextIdx].toUpperCase()
					}

					return str
				})
				.join('')
		)
		.join(' ')
		.trim()
}

export function dateFormatter(timestamp = null) {
	if (!timestamp) return null

	const dayInMs = 24 * 60 * 60 * 1000
	const twoDaysInMs = 2 * 24 * 60 * 60 * 1000
	const weekInMs = 7 * 24 * 60 * 60 * 1000
	const now = new Date()
	const pastTime = new Date(timestamp / 1000)

	const timeDiffInMs = now.getTime() - pastTime.getTime()
	const isToday = timeDiffInMs <= dayInMs
	const isYesterday = !isToday && timeDiffInMs <= twoDaysInMs
	const isPastTimeOlderThanAWeek = timeDiffInMs > weekInMs

	const updateWord =
		'Updated ' +
		(isToday
			? 'today at '
			: isYesterday
			? 'yesterday at '
			: isPastTimeOlderThanAWeek
			? 'on'
			: 'last')

	// e.g. 9:13 in the morning
	const dayOptions = {
		// dayPeriod: 'short',
		// hourCycle: 'h12',
		// hour: 'numeric',
		// minute: 'numeric',
		timeStyle: 'short',
	}

	// e.g: Thu 09:02 at night
	const weekOptions = {
		weekday: 'long',
		// dayPeriod: 'short',
		// hourCycle: 'h12',
		// weekday: 'short',
		// hour: 'numeric',
		// minute: 'numeric',
	}

	// e.g. Thu, 30 Mar 2023, 21:02
	const dateOptions = {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		// hour: 'numeric',
		// minute: '2-digit',
		// hour12: false,
		// timeZone: 'America/Guayaquil',
		// timeZoneName: 'short',
	}

	const options =
		isToday || isYesterday
			? dayOptions
			: isPastTimeOlderThanAWeek
			? dateOptions
			: weekOptions

	const formattedDateString = new Intl.DateTimeFormat('en-GB', options).format(
		pastTime
	)

	return `${updateWord} ${formattedDateString}`
}

export function twoDigitsNumber(number = 0) {
	return Number(number.toFixed(2))
}
