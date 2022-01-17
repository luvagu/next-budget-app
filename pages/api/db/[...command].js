import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { readUserData } from '../../../utils/faunadb'

const ALLOWED_COMMANDS = {
	create: 'POST',
	read: 'GET',
	update: 'PUT',
	delete: 'DELETE',
}

export default withApiAuthRequired(async function handler(req, res) {
	const [command, query, args] = req.query.command
	const method = req.method

	if (!ALLOWED_COMMANDS[command] || ALLOWED_COMMANDS[command] !== method) {
		return res.status(405).json({ message: 'Command/Method not allowed' })
	}

	if (ALLOWED_COMMANDS[command] === 'GET') {
		if (query === 'userdata') {
			try {
				const userData = await readUserData(args)
				return res.status(200).json({ ...userData })
			} catch (error) {
				return res.status(500).json({ message: error?.message })
			}
		}

		res.status(200).json({})
	}
})
