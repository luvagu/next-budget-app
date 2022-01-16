import { createContext, useContext, useState } from 'react'
import { generateUID } from '../utils/helpers'

const BudgetsContext = createContext()

export function useBadgets() {
	return useContext(BudgetsContext)
}

function BudgetsProvider({ children }) {
	const [budgets, setBudgets] = useState([
		{
			id: 'OL04-1279-1Y99-O9tl-q29H',
			name: 'Gadgets',
			max: 100,
		},
	])

	const [expenses, setExpenses] = useState([
		{
			id: generateUID(),
			budgetId: 'OL04-1279-1Y99-O9tl-q29H',
			amount: 35,
			description: 'Headphones',
		},
	])

	const getBudgetExpenses = budgetId => {
		return expenses.filter(expense => expense.budgetId === budgetId)
	}

	const addExpense = ({ budgetId, amount, description }) => {
		const newExpense = {
			id: generateUID(),
			budgetId: budgetId,
			amount,
			description,
		}

		setExpenses(prevExpenses => [...prevExpenses, newExpense])
	}

	const addBudget = ({ name, max }) => {
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

	const deleteBudget = id => {
		// @ToDo: deal with Uncaregorized
		setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id))
	}

	const deleteExpense = id =>
		setExpenses(prevExpenses =>
			prevExpenses.filter(expense => expense.id !== id)
		)

	return (
		<BudgetsContext.Provider
			value={{
				budgets,
				expenses,
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
