import { Client, query } from 'faunadb'
import { mailRaffle0324Notification } from '@/utils//mailgun'

const client = new Client({
	secret: process.env.FAUNADB_SECRET,
	domain: 'db.fauna.com',
})

const { Call, Function: Fn } = query

const callFn = (name, args) => Call(Fn(name), args)

export const readUserData = async user => {
	const data = await client.query(callFn('getUserData', user))

	const budgets = data.budgets.data.map(budget => {
		return {
			...budget.data,
			id: budget.ref.id,
			ts: budget.ts,
		}
	})

	const expenses = data.expenses.data.map(expense => {
		return {
			...expense.data,
			id: expense.ref.id,
			ts: expense.ts,
		}
	})

	return { budgets, expenses }
}

export const createBudget = async data => {
	return (await client.query(callFn('addBudget', data))).data
}

export const createExpense = async data => {
	return (await client.query(callFn('addExpense', data))).data
}

export const deleteBudget = async ref => {
	return (await client.query(callFn('deleteBudget', ref))).data
}

export const deleteExpense = async ref => {
	return (await client.query(callFn('deleteExpense', ref))).data
}

export const updateBudget = async (ref, data) => {
	return (await client.query(callFn('updateBudget', [ref, data]))).data
}

export const updateExpense = async (ref, data) => {
	return (await client.query(callFn('updateExpense', [ref, data]))).data
}

export const getRaffleSlots_0324 = async () => {
	const response = (await client.query(callFn('getRaffleSlots_0324'))).data

	return response.map(slot => ({
		...slot.data,
		id: slot.ref.id,
		ts: slot.ts,
	}))
}

export const addRaffleSlot_0324 = async data => {
	const response = await client.query(callFn('addRaffleSlot_0324', data))

	// send # reservation mail norification
	await mailRaffle0324Notification({
		...response.data,
		ref: response.ref.id,
	}).catch(() => {})

	return response
}

export const deleteRaffleSlot_0324 = async ref => {
	return (await client.query(callFn('deleteRaffleSlot_0324', ref))).data
}
