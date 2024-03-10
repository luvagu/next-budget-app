import { useEffect, useState } from 'react'

export default function useLocalStorage(lsKey, defaultValue) {
	const [lsData, setLsData] = useState(() => {
		const jsonData = process.browser ? localStorage.getItem(lsKey) : null

		if (jsonData !== null) {
			return JSON.parse(jsonData)
		}

		if (typeof defaultValue === 'function') {
			return defaultValue()
		} else {
			return defaultValue
		}
	})

	useEffect(() => {
		if (process.browser) {
			localStorage.setItem(lsKey, JSON.stringify(lsData))
		}
	}, [lsKey, lsData])

	return [lsData, setLsData]
}
