import { handleCallback } from '@auth0/nextjs-auth0'

const callback = async (req, res) => {
	try {
		await handleCallback(req, res, { redirectTo: '/' })
	} catch (error) {
		// console.log('@@ error at callback', error)

		res
			?.status(error.status || 400)
			?.end(error.message)
			?.redirect('/')
	}
}

export default callback
