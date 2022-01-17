import useSWR from 'swr'

async function fetcher(...args) {
	const res = await fetch(...args)
	return res.json()
}

export default function useDbData(endpoint) {
	const { data, error, mutate } = useSWR(endpoint, fetcher)

	return {
		data,
		isLoading: !error && !data,
		isError: error,
		mutate,
	}
}
