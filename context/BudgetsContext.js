import { createContext, useContext, useState } from 'react'

const BudgetsContext = createContext()

export function useBadgets() {
	return useContext(BudgetsContext)
}

function BudgetsProvider({ children }) {
	const [budgets, setBudgets] = useState([])
	const [expenses, setExpenses] = useState([])

	const getBudgetExpenses = () => {}

	const addExpense = () => {}

	const addBudget = () => {}

	const deleteBudget = () => {}

	const deleteExpense = () => {}

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
