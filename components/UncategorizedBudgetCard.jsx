import { UNCATEGORIZED_BUDGET_ID, useBadgets } from '@/context/BudgetsContext'
import BudgetCard from '@/components/BudgetCard'

function UncategorizedBudgetCard() {
	const { getBudgetExpensesAmount } = useBadgets()

	const amount = getBudgetExpensesAmount(UNCATEGORIZED_BUDGET_ID)

	if (amount === 0) return null

	return (
		<BudgetCard
			id={UNCATEGORIZED_BUDGET_ID}
			name={UNCATEGORIZED_BUDGET_ID}
			amount={amount}
			bgColor='unrecognized'
		/>
	)
}

export default UncategorizedBudgetCard
