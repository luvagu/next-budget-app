import { useUser } from '@auth0/nextjs-auth0'
import { createContext, useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { generateUID } from '../utils/helpers'

const BudgetsContext = createContext()

const LS_BUDGETS_KEY = 'ls.budgets'
const LS_EXPENSES_KEY = 'ls.expenses'

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export function useBadgets() {
	return useContext(BudgetsContext)
}

function BudgetsProvider({ children }) {
	const { user } = useUser()
	const [budgets, setBudgets] = useLocalStorage(LS_BUDGETS_KEY, [])
	const [expenses, setExpenses] = useLocalStorage(LS_EXPENSES_KEY, [])
	const [openAddBudgetModal, setOpenAddBudgetModal] = useState(false)
	const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
	const [openViewExpenseModal, setOpenViewExpenseModal] = useState(false)
	const [defaultBudgetId, setDefaultBudgetId] = useState(
		UNCATEGORIZED_BUDGET_ID
	)

	function toggleAddBudgetModal() {
		setOpenAddBudgetModal(!openAddBudgetModal)
	}

	function toggleAddExpenseModal() {
		setOpenAddExpenseModal(!openAddExpenseModal)
	}

	function toggleViewExpenseModal() {
		setOpenViewExpenseModal(!openViewExpenseModal)
	}

	function openAddExpenseModalWithId(id) {
		setDefaultBudgetId(id ? id : UNCATEGORIZED_BUDGET_ID)
		toggleAddExpenseModal()
	}

	function openViewExpenseModalWithId(id) {
		setDefaultBudgetId(id ? id : UNCATEGORIZED_BUDGET_ID)
		toggleViewExpenseModal()
	}

	function getBudgetExpenses(budgetId) {
		return expenses.filter(expense => expense.budgetId === budgetId)
	}

	function addExpense({ budgetId, amount, description }) {
		const newExpense = {
			id: generateUID(),
			budgetId: budgetId,
			amount,
			description,
		}

		setExpenses(prevExpenses => [...prevExpenses, newExpense])
	}

	function addBudget({ name, max }) {
		const newBudget = {
			id: generateUID(),
			name,
			max,
		}

		setBudgets(prevBudgets => {
			if (prevBudgets.find(budget => budget.name === name)) {
				return prevBudgets
			}

			return [...prevBudgets, newBudget]
		})
	}

	function deleteBudget(id) {
		setExpenses(prevExpenses =>
			prevExpenses.map(expense => {
				if (expense.budgetId === id) {
					return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
				}
				return expense
			})
		)

		setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id))
	}

	function deleteExpense(id) {
		setExpenses(prevExpenses =>
			prevExpenses.filter(expense => expense.id !== id)
		)
	}

	return (
		<BudgetsContext.Provider
			value={{
				budgets,
				expenses,
				openAddBudgetModal,
				toggleAddBudgetModal,
				openAddExpenseModal,
				toggleAddExpenseModal,
				defaultBudgetId,
				openAddExpenseModalWithId,
				openViewExpenseModal,
				toggleViewExpenseModal,
				openViewExpenseModalWithId,
				getBudgetExpenses,
				addExpense,
				addBudget,
				deleteBudget,
				deleteExpense,
			}}
		>
			{children}
		</BudgetsContext.Provider>
	)
}

export default BudgetsProvider
