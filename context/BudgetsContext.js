import { createContext, useContext, useState } from 'react'
import { generateUID } from '../utils/helpers'

const BudgetsContext = createContext()

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export function useBadgets() {
	return useContext(BudgetsContext)
}

function BudgetsProvider({ children }) {
	const [budgets, setBudgets] = useState([])
	const [expenses, setExpenses] = useState([])
	const [openAddBudgetModal, setOpenAddBudgetModal] = useState(false)
	const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
	const [defaultBudgetId, setDefaultBudgetId] = useState(
		UNCATEGORIZED_BUDGET_ID
	)

	function toggleBudgetModal() {
		setOpenAddBudgetModal(!openAddBudgetModal)
	}

	function toggleExpenseModal() {
		setOpenAddExpenseModal(!openAddExpenseModal)
	}

	function openExpenseModalWithId(id) {
		setDefaultBudgetId(id ? id : UNCATEGORIZED_BUDGET_ID)
		toggleExpenseModal()
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
		// @ToDo: deal with Uncategorized
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
				toggleBudgetModal,
				openAddExpenseModal,
				toggleExpenseModal,
				defaultBudgetId,
				openExpenseModalWithId,
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
