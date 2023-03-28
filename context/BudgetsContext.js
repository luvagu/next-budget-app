import { useUser } from '@auth0/nextjs-auth0'
import { createContext, useContext, useState } from 'react'
import useDbData from '../hooks/useDbData'
import { generateUID } from '../utils/helpers'
import axios from 'axios'

const BudgetsContext = createContext()

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'
export const BUDGET_TYPE_DEFAULT = 'default'
export const BUDGET_TYPE_INSTALLMENTS = 'installmets'

export function useBadgets() {
	return useContext(BudgetsContext)
}

function BudgetsProvider({ children }) {
	const { user } = useUser()
	const { data, isFetching, isError, mutate } = useDbData(
		user ? `/api/db/read/userdata/${user?.sub}` : null
	)

	const [currentExpense, setCurrentExpense] = useState({})
	const [defaultBudgetId, setDefaultBudgetId] = useState(
		UNCATEGORIZED_BUDGET_ID
	)
	const [deleteData, setDeleteData] = useState({ type: '', id: '' })
	const [isDuplicateBudget, setIsDuplicateBudget] = useState(false)
	const [openAddBudgetModal, setOpenAddBudgetModal] = useState(false)
	const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
	const [openConfirmDeteleModal, setOpenConfirmDeteleModal] = useState(false)
	const [openUpdateBudgetModal, setOpenUpdateBudgetModal] = useState(false)
	const [openUpdateExpenseModal, setOpenUpdateExpenseModal] = useState(false)
	const [openViewExpenseModal, setOpenViewExpenseModal] = useState(false)

	const budgets = data?.budgets
	const expenses = data?.expenses

	function deleteDataCallback() {
		const { type, id } = deleteData

		if (type === 'budget') {
			deleteBudget(id)
		}

		if (type === 'expense') {
			deleteExpense(id)
		}

		toggleConfirmDeleteModal()
	}

	function toggleConfirmDeleteModal() {
		setOpenConfirmDeteleModal(!openConfirmDeteleModal)
	}

	function toggleAddBudgetModal() {
		setOpenAddBudgetModal(!openAddBudgetModal)
	}

	function toggleUpdateBudgetModal() {
		setOpenUpdateBudgetModal(!openUpdateBudgetModal)
	}

	function toggleAddExpenseModal() {
		setOpenAddExpenseModal(!openAddExpenseModal)
	}

	function toggleUpdateExpenseModal() {
		setOpenUpdateExpenseModal(!openUpdateExpenseModal)
	}

	function toggleViewExpenseModal() {
		setOpenViewExpenseModal(!openViewExpenseModal)
	}

	function toggleBudgetNameErrorModal() {
		setIsDuplicateBudget(!isDuplicateBudget)
	}

	function openConfirmDeleteModalWithTypeAndId(typeAndId = {}) {
		toggleConfirmDeleteModal()
		setDeleteData(typeAndId)
	}

	function openAddExpenseModalWithId(id = UNCATEGORIZED_BUDGET_ID) {
		setDefaultBudgetId(id)
		toggleAddExpenseModal()
	}

	function openViewExpenseModalWithId(id = UNCATEGORIZED_BUDGET_ID) {
		setDefaultBudgetId(id)
		toggleViewExpenseModal()
	}

	function openUpdateBudgetModalWithId(id) {
		setDefaultBudgetId(id)
		toggleUpdateBudgetModal()
	}

	function openUpdateExpenseModalWithData(budgetId, expense) {
		setDefaultBudgetId(budgetId)
		setCurrentExpense(expense)
		toggleUpdateExpenseModal()
	}

	function getBudgetExpenses(budgetId) {
		return expenses?.filter(expense => expense.budgetId === budgetId)
	}

	function getDefaultBudget() {
		return defaultBudgetId === UNCATEGORIZED_BUDGET_ID
			? {
					id: UNCATEGORIZED_BUDGET_ID,
					name: UNCATEGORIZED_BUDGET_ID,
					max: undefined,
			  }
			: budgets?.find(budget => budget.id === defaultBudgetId) || {}
	}

	async function addBudget({ name, max, type }) {
		if (budgets.some(budget => budget.name === name)) {
			return setIsDuplicateBudget(true)
		}

		const newBudget = {
			id: generateUID(),
			name,
			max,
			type,
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
			budgetId,
			amount,
			description,
			user: user.sub,
		}

		mutate({ ...data, expenses: [...expenses, newExpense] }, false)

		const { id, ...restOfData } = newExpense
		await axios.post('/api/db/create/expense', restOfData)
		await mutate()
	}

	async function updateExpense({ budgetId, description, amount, ref }) {
		const newExpenseData = {
			budgetId,
			amount,
			description,
		}

		mutate(
			{
				...data,
				expenses: expenses.map(expense => {
					if (expense.id === ref) {
						return {
							...expense,
							...newExpenseData,
						}
					}
					return expense
				}),
			},
			false
		)

		await axios.put(`/api/db/update/expense/${ref}`, newExpenseData)
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
				addBudget,
				addExpense,
				budgets,
				currentExpense,
				defaultBudgetId,
				deleteData,
				deleteDataCallback,
				expenses,
				getBudgetExpenses,
				getDefaultBudget,
				isDuplicateBudget,
				isError,
				isFetching,
				openAddBudgetModal,
				openAddExpenseModal,
				openAddExpenseModalWithId,
				openConfirmDeteleModal,
				openConfirmDeleteModalWithTypeAndId,
				openUpdateBudgetModal,
				openUpdateBudgetModalWithId,
				openUpdateExpenseModal,
				openUpdateExpenseModalWithData,
				openViewExpenseModal,
				openViewExpenseModalWithId,
				toggleAddBudgetModal,
				toggleAddExpenseModal,
				toggleBudgetNameErrorModal,
				toggleConfirmDeleteModal,
				toggleUpdateBudgetModal,
				toggleUpdateExpenseModal,
				toggleViewExpenseModal,
				updateBudget,
				updateExpense,
			}}
		>
			{children}
		</BudgetsContext.Provider>
	)
}

export default BudgetsProvider
