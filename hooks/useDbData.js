import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)
// const fetcher = url => fetch(url).then(r => r.json())

export default function useDbData(endpoint, fallbackData) {
	const { data, error, mutate } = useSWR(endpoint, fetcher, { fallbackData })

	return {
		data,
		isFetching: !data && !error,
		isError: error,
		mutate,
	}
}
