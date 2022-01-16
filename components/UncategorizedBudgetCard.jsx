import { UNCATEGORIZED_BUDGET_ID, useBadgets } from '../context/BudgetsContext'
import BudgetCard from './BudgetCard'

function UncategorizedBudgetCard() {
	const { getBudgetExpenses } = useBadgets()

	const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
		(total, expense) => total + expense.amount,
		0
	)

	if (amount === 0) return null

	return (
		<BudgetCard
			id={UNCATEGORIZED_BUDGET_ID}
			name={UNCATEGORIZED_BUDGET_ID}
			amount={amount}
			gray
		/>
	)
}

export default UncategorizedBudgetCard
