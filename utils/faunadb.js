import { Client, query } from 'faunadb'

const client = new Client({
	secret: process.env.FAUNADB_SECRET,
	domain: 'db.fauna.com',
})

const { Call, Function: Fn } = query

const callFunction = (fnName, args) => Call(Fn(fnName), args)

export const readUserData = async user => {
	const data = await client.query(callFunction('getUserData', user))

	const budgets = data.budgets.data.map(budget => {
		return {
			...budget.data,
			id: budget.ref.id,
		}
	})

	const expenses = data.expenses.data.map(expense => {
		return {
			...expense.data,
			id: expense.ref.id,
		}
	})

	return { budgets, expenses }
}
