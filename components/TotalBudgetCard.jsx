import { useBadgets } from '@/context/BudgetsContext'
import BudgetCard from '@/components/BudgetCard'
import { useTranslation } from 'react-i18next'

function TotalBudgetCard() {
	const { totalExpensesVsBudgets } = useBadgets()

	const { t } = useTranslation()

	const { amount, max } = totalExpensesVsBudgets

	if (max === 0) return null

	return (
		<BudgetCard
			name={t('label_total_budgets')}
			amount={amount}
			max={max}
			bgColor='total'
			isTotal
		/>
	)
}

export default TotalBudgetCard
