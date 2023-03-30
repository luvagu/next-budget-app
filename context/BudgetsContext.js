import { useUser } from '@auth0/nextjs-auth0'
import { createContext, useContext, useState } from 'react'
import useDbData from '../hooks/useDbData'
import { generateUID } from '../utils/helpers'
import axios from 'axios'

const BudgetsContext = createContext()

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'
export const BUDGET_TYPE_DEFAULT = 'default'
export const BUDGET_TYPE_LOAN = 'loan'
export const EXPENSE_TYPE_DEFAULT = 'default'
export const EXPENSE_TYPE_INSTALLMENT = 'installment'

export const BUDGET_CARD_BG_COLORS = {
	white: 'bg-white',
	gray: 'bg-gray-100',
	orange: 'bg-orange-100',
	yellow: 'bg-yellow-100',
	lime: 'bg-lime-100',
	emerald: 'bg-emerald-100',
	cyan: 'bg-cyan-100',
	violet: 'bg-violet-100',
}

export const budgetCardBgColors = Object.keys(BUDGET_CARD_BG_COLORS)

export function useBadgets() {
	return useContext(BudgetsContext)
}

function BudgetsProvider({ children }) {
	const { user } = useUser()

	// Set global Axios required Authorization headers for all api calls
	axios.defaults.headers.common['Authorization'] = user?.sub

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

	const defaultBudget =
		defaultBudgetId === UNCATEGORIZED_BUDGET_ID
			? {
					id: UNCATEGORIZED_BUDGET_ID,
					name: UNCATEGORIZED_BUDGET_ID,
					max: undefined,
					type: undefined,
			  }
			: budgets?.find(budget => budget.id === defaultBudgetId) || {}

	const budgetsTypeDefault = budgets?.filter(
		({ type }) => type !== BUDGET_TYPE_LOAN
	)

	const budgetsTypeLoan = budgets?.filter(
		({ type }) => type === BUDGET_TYPE_LOAN
	)

	const expensesTypeDefault = expenses?.filter(
		({ type }) => type !== EXPENSE_TYPE_INSTALLMENT
	)

	const totalExpensesVsBudgets = {
		amount: expensesTypeDefault?.reduce(
			(total, expense) => total + expense.amount,
			0
		),
		max: budgetsTypeDefault?.reduce((total, budget) => total + budget.max, 0),
	}

	const isBudgetTypeLoan = defaultBudget?.type === BUDGET_TYPE_LOAN

	function deleteDataCallback() {
		const { type, id } = deleteData

		if (type === 'budget') {
			deleteBudget(id)
		}

		if (type === 'expense' || type === 'installment') {
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
		if (typeAndId === 'budget') {
			setDefaultBudgetId(typeAndId.id)
		}

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

	function getBudgetExpensesAmount(budgetId) {
		return expenses
			?.filter(expense => expense.budgetId === budgetId)
			?.reduce((total, expense) => total + expense.amount, 0)
	}

	async function addBudget({ name, max, type, bgColor }) {
		if (budgets.some(budget => budget.name === name)) {
			return setIsDuplicateBudget(true)
		}

		const newBudget = {
			id: generateUID(),
			name,
			max,
			type,
			bgColor,
			user: user.sub,
		}

		mutate({ ...data, budgets: [...budgets, newBudget] }, false)

		const { id, ...restOfData } = newBudget
		await axios.post('/api/db/create/budget', restOfData)
		await mutate()
	}

	async function updateBudget({ name, max, bgColor, ref }) {
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
			bgColor,
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

	async function addExpense({ budgetId, amount, description, type }) {
		const newExpense = {
			id: generateUID(),
			budgetId,
			amount,
			description,
			type,
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
		const isBudgetLoan =
			budgets?.find(budget => budget.id === id)?.type === BUDGET_TYPE_LOAN

		mutate(
			{
				...data,
				expenses: isBudgetLoan
					? expenses.filter(expense => {
							if (expense.budgetId === id) {
								refsToUpdate.push(expense.id)
							}
							return expense.budgetId !== id
					  })
					: expenses.map(expense => {
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
			if (isBudgetLoan) {
				await axios.delete(`/api/db/delete/expense/${ref}`)
			} else {
				await axios.put(`/api/db/update/expense/${ref}`, {
					budgetId: UNCATEGORIZED_BUDGET_ID,
				})
			}
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
				defaultBudget,
				defaultBudgetId,
				budgetsTypeDefault,
				budgetsTypeLoan,
				deleteData,
				deleteDataCallback,
				expenses,
				getBudgetExpenses,
				getBudgetExpensesAmount,
				isBudgetTypeLoan,
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
				totalExpensesVsBudgets,
				updateBudget,
				updateExpense,
			}}
		>
			{children}
		</BudgetsContext.Provider>
	)
}

export default BudgetsProvider
