import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import {
	createBudget,
	createExpense,
	deleteBudget,
	deleteExpense,
	readUserData,
	updateBudget,
	updateExpense,
} from '@/utils/faunadb'

const ALLOWED_COMMANDS = {
	create: 'POST',
	read: 'GET',
	update: 'PUT',
	delete: 'DELETE',
}

const QUERY_TYPES = {
	budget: 'budget',
	expense: 'expense',
	userdata: 'userdata',
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

	// GET method
	if (ALLOWED_COMMANDS[command] === ALLOWED_COMMANDS.read) {
		if (query === QUERY_TYPES.userdata) {
			try {
				const userData = await readUserData(args)
				return res.status(200).json({ ...userData })
			} catch (error) {
				return res.status(500).json({ message: error?.message })
			}
		}

		res.status(404).json({ message: '404 Not Found' })
	}

	// POST method
	if (ALLOWED_COMMANDS[command] === ALLOWED_COMMANDS.create) {
		try {
			let response
			if (query === QUERY_TYPES.budget) {
				response = await createBudget(data)
				return res.status(200).json(response)
			}
			if (query === QUERY_TYPES.expense) {
				response = await createExpense(data)
				return res.status(200).json(response)
			}
		} catch (error) {
			return res.status(500).json({ message: error?.message })
		}

		res.status(404).json({ message: '404 Not Found' })
	}

	// PUT method
	if (ALLOWED_COMMANDS[command] === ALLOWED_COMMANDS.update) {
		try {
			let response
			if (query === QUERY_TYPES.budget) {
				response = await updateBudget(args, data)
				return res.status(200).json(response)
			}
			if (query === QUERY_TYPES.expense) {
				response = await updateExpense(args, data)
				return res.status(200).json(response)
			}
		} catch (error) {
			return res.status(500).json({ message: error })
		}

		res.status(404).json({ message: '404 Not Found' })
	}

	// DELETE method
	if (ALLOWED_COMMANDS[command] === ALLOWED_COMMANDS.delete) {
		try {
			let response
			if (query === QUERY_TYPES.budget) {
				response = await deleteBudget(args)
				return res.status(200).json(response)
			}
			if (query === QUERY_TYPES.expense) {
				response = await deleteExpense(args)
				return res.status(200).json(response)
			}
		} catch (error) {
			return res.status(500).json({ message: error?.message })
		}

		res.status(404).json({ message: '404 Not Found' })
	}
})
