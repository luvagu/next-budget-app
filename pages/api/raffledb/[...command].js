import { addRaffleSlot_0324, getRaffleSlots_0324 } from '@/utils/faunadb'

const ALLOWED_COMMANDS = {
	create: 'POST',
	read: 'GET',
	update: 'PUT',
	delete: 'DELETE',
}

const QUERY_TYPES = {
	raffle0324: 'raffle0324',
}

export default async function handler(req, res) {
	const authorization = req.headers.authorization
	const [command, query] = req.query.command
	const method = req.method
	const data = req.body

	if (authorization !== 'Raffle0324') {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	if (!ALLOWED_COMMANDS[command] || ALLOWED_COMMANDS[command] !== method) {
		return res.status(405).json({ message: 'Command/Method not allowed' })
	}

	// GET method
	if (ALLOWED_COMMANDS[command] === ALLOWED_COMMANDS.read) {
		try {
			let response
			if (query === QUERY_TYPES.raffle0324) {
				response = await getRaffleSlots_0324()

				return res.status(200).json(response)
			}
		} catch (error) {
			return res.status(400).json({ error: error?.message })
		}

		res.status(404).json({ message: '404 Not Found' })
	}

	// POST method
	if (ALLOWED_COMMANDS[command] === ALLOWED_COMMANDS.create) {
		try {
			let response
			if (query === QUERY_TYPES.raffle0324) {
				response = await addRaffleSlot_0324(data)

				return res.status(200).json(response)
			}
		} catch (error) {
			return res.status(400).json({ error: error?.message })
		}

		res.status(404).json({ message: '404 Not Found' })
	}
}
