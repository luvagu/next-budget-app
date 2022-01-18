import { Client, query } from 'faunadb'

const client = new Client({
	secret: process.env.FAUNADB_SECRET,
	domain: 'db.fauna.com',
})

const { Call, Function: Fn } = query

const callFunction = (name, args) => Call(Fn(name), args)

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

export const createBudget = async data => {
	return (await client.query(callFunction('addBudget', data))).data
}

export const createExpense = async data => {
	return (await client.query(callFunction('addExpense', data))).data
}

export const deleteBudget = async ref => {
	return (await client.query(callFunction('deleteBudget', ref))).data
}

export const deleteExpense = async ref => {
	return (await client.query(callFunction('deleteExpense', ref))).data
}

export const updateExpense = async (ref, data) => {
	return (await client.query(callFunction('updateExpense', [ref, data]))).data
}
