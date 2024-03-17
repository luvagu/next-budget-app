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

export const addRaffleSlots_0324 = async data => {
	const dataArr = Array.isArray(data) ? data : [data]
	const response = await client.query(callFn('addRaffleSlots_0324', dataArr))

	const mailData = response.reduce(
		(acc, curr, index) => {
			if (index === 0) {
				acc.user = curr.data.user
				acc.phone = curr.data.phone
				acc.payment = curr.data.payment
			}

			acc.values.push(curr.data.value)
			acc.refs.push(curr.ref.id)

			return acc
		},
		{
			values: [],
			refs: [],
		}
	)

	// send # reservation mail notification
	await mailRaffle0324Notification(mailData).catch(() => {})

	return response
}

export const deleteRaffleSlots_0324 = async refs => {
	const refsArr = Array.isArray(refs) ? refs : [refs]

	return (await client.query(callFn('deleteRaffleSlots_0324', refsArr))).data
}
