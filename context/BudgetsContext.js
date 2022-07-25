import { useUser } from '@auth0/nextjs-auth0'
import { createContext, useContext, useState } from 'react'
import useDbData from '../hooks/useDbData'
import { generateUID } from '../utils/helpers'
import axios from 'axios'

const BudgetsContext = createContext()

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export function useBadgets() {
	return useContext(BudgetsContext)
}

function BudgetsProvider({ children }) {
	const { user } = useUser()
	const { data, isFetching, isError, mutate } = useDbData(
		user ? `/api/db/read/userdata/${user?.sub}` : null
		// {
		// 	budgets: [],
		// 	expenses: [],
		// }
	)

	const [isDuplicateBudget, setIsDuplicateBudget] = useState(false)
	const [openAddBudgetModal, setOpenAddBudgetModal] = useState(false)
	const [openUpdateBudgetModal, setOpenUpdateBudgetModal] = useState(false)
	const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
	const [openViewExpenseModal, setOpenViewExpenseModal] = useState(false)
	const [defaultBudgetId, setDefaultBudgetId] = useState(
		UNCATEGORIZED_BUDGET_ID
	)

	const budgets = data?.budgets
	const expenses = data?.expenses

	function toggleAddBudgetModal() {
		setOpenAddBudgetModal(!openAddBudgetModal)
	}

	function toggleUpdateBudgetModal() {
		setOpenUpdateBudgetModal(!openUpdateBudgetModal)
	}

	function toggleAddExpenseModal() {
		setOpenAddExpenseModal(!openAddExpenseModal)
	}

	function toggleViewExpenseModal() {
		setOpenViewExpenseModal(!openViewExpenseModal)
	}

	function toggleBudgetNameErrorModal() {
		setIsDuplicateBudget(!isDuplicateBudget)
	}

	function openAddExpenseModalWithId(id) {
		setDefaultBudgetId(id ? id : UNCATEGORIZED_BUDGET_ID)
		toggleAddExpenseModal()
	}

	function openViewExpenseModalWithId(id) {
		setDefaultBudgetId(id ? id : UNCATEGORIZED_BUDGET_ID)
		toggleViewExpenseModal()
	}

	function openUpdateBudgetModalWithId(id) {
		setDefaultBudgetId(id)
		toggleUpdateBudgetModal()
	}

	function getBudgetExpenses(budgetId) {
		return expenses?.filter(expense => expense.budgetId === budgetId)
	}

	function getDefaultBudget() {
		return budgets?.find(budget => budget.id === defaultBudgetId) || {}
	}

	async function addBudget({ name, max }) {
		if (budgets.some(budget => budget.name === name)) {
			return setIsDuplicateBudget(true)
		}

		const newBudget = {
			id: generateUID(),
			name,
			max,
			user: user.sub,
		}

		mutate({ ...data, budgets: [...budgets, newBudget] }, false)

		const { id, ...restOfData } = newBudget
		await axios.post('/api/db/create/budget', restOfData)
		await mutate()
	}

	async function updateBudget({ name, max, ref }) {
		if (
			budgets
				.filter(({ id }) => id !== ref)
				.some(budget => budget.name === name)
		) {
			return setIsDuplicateBudget(true)
		}

		const newBudgetData = {
			name,
			max,
		}

		mutate(
			{
				...data,
				budgets: budgets.map(budget => {
					if (budget.id === ref) {
						return {
							...budget,
							...newBudgetData,
						}
					}
					return budget
				}),
			},
			false
		)

		await axios.put(`/api/db/update/budget/${ref}`, newBudgetData)
		await mutate()
	}

	async function addExpense({ budgetId, amount, description }) {
		const newExpense = {
			id: generateUID(),
			budgetId: budgetId,
			amount,
			description,
			user: user.sub,
		}

		mutate({ ...data, expenses: [...expenses, newExpense] }, false)

		const { id, ...restOfData } = newExpense
		await axios.post('/api/db/create/expense', restOfData)
		await mutate()
	}

	async function deleteBudget(id) {
		const refsToUpdate = []

		mutate(
			{
				...data,
				expenses: expenses.map(expense => {
					if (expense.budgetId === id) {
						refsToUpdate.push(expense.id)
						return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
					}
					return expense
				}),
				budgets: budgets.filter(budget => budget.id !== id),
			},
			false
		)

		for (const ref of refsToUpdate) {
			await axios.put(`/api/db/update/expense/${ref}`, {
				budgetId: UNCATEGORIZED_BUDGET_ID,
			})
		}

		await axios.delete(`/api/db/delete/budget/${id}`)
		await mutate()
	}

	async function deleteExpense(id) {
		mutate(
			{ ...data, expenses: expenses.filter(expense => expense.id !== id) },
			false
		)

		await axios.delete(`/api/db/delete/expense/${id}`)
		await mutate()
	}

	return (
		<BudgetsContext.Provider
			value={{
				isFetching,
				isError,
				budgets,
				expenses,
				isDuplicateBudget,
				toggleBudgetNameErrorModal,
				openAddBudgetModal,
				toggleAddBudgetModal,
				openUpdateBudgetModal,
				openUpdateBudgetModalWithId,
				toggleUpdateBudgetModal,
				openAddExpenseModal,
				toggleAddExpenseModal,
				defaultBudgetId,
				openAddExpenseModalWithId,
				openViewExpenseModal,
				toggleViewExpenseModal,
				openViewExpenseModalWithId,
				getDefaultBudget,
				getBudgetExpenses,
				addExpense,
				addBudget,
				updateBudget,
				deleteBudget,
				deleteExpense,
			}}
		>
			{children}
		</BudgetsContext.Provider>
	)
}

export default BudgetsProvider
