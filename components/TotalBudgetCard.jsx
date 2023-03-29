import { BUDGET_TYPE_INSTALLMENTS, useBadgets } from '../context/BudgetsContext'
import BudgetCard from './BudgetCard'

function TotalBudgetCard() {
	const { budgets, expenses } = useBadgets()

	const amount = expenses?.reduce((total, expense) => total + expense.amount, 0)

	const max = budgets
		.filter(({ type }) => type !== BUDGET_TYPE_INSTALLMENTS)
		?.reduce((total, budget) => total + budget.max, 0)

	if (max === 0) return null

	return <BudgetCard name='Total' amount={amount} max={max} gray />
}

export default TotalBudgetCard
