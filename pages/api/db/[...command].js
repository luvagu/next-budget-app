import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import {
	createBudget,
	createExpense,
	deleteBudget,
	deleteExpense,
	readUserData,
	updateBudget,
	updateExpense,
} from '../../../utils/faunadb'

const ALLOWED_COMMANDS = {
	create: 'POST',
	read: 'GET',
	update: 'PUT',
	delete: 'DELETE',
}

export default withApiAuthRequired(async function handler(req, res) {
	const session = getSession(req, res)
	const userId = session?.user?.sub
	const authorization = req.headers.authorization

	const [command, query, args] = req.query.command
	const method = req.method
	const data = req.body

	if (userId !== authorization) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

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

		res.status(404).json({ message: '404 Not Found' })
	}

	if (ALLOWED_COMMANDS[command] === 'POST') {
		try {
			let response
			if (query === 'budget') {
				response = await createBudget(data)
				return res.status(200).json(response)
			}
			if (query === 'expense') {
				response = await createExpense(data)
				return res.status(200).json(response)
			}
		} catch (error) {
			return res.status(500).json({ message: error?.message })
		}

		res.status(404).json({ message: '404 Not Found' })
	}

	if (ALLOWED_COMMANDS[command] === 'DELETE') {
		try {
			let response
			if (query === 'budget') {
				response = await deleteBudget(args)
				return res.status(200).json(response)
			}
			if (query === 'expense') {
				response = await deleteExpense(args)
				return res.status(200).json(response)
			}
		} catch (error) {
			return res.status(500).json({ message: error?.message })
		}

		res.status(404).json({ message: '404 Not Found' })
	}

	if (ALLOWED_COMMANDS[command] === 'PUT') {
		try {
			let response
			if (query === 'budget') {
				response = await updateBudget(args, data)
				return res.status(200).json(response)
			}
			if (query === 'expense') {
				response = await updateExpense(args, data)
				return res.status(200).json(response)
			}
		} catch (error) {
			return res.status(500).json({ message: error })
		}

		res.status(404).json({ message: '404 Not Found' })
	}
})
