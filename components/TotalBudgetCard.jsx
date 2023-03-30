import { useBadgets } from '../context/BudgetsContext'
import BudgetCard from './BudgetCard'

function TotalBudgetCard() {
	const { totalExpensesVsBudgets } = useBadgets()

	const { amount, max } = totalExpensesVsBudgets

	if (max === 0) return null

	return <BudgetCard name='Total' amount={amount} max={max} isTotal />
}

export default TotalBudgetCard
