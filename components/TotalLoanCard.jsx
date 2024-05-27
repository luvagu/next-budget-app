import { BUDGET_TYPES, useBadgets } from '@/context/BudgetsContext'
import BudgetCard from '@/components/BudgetCard'
import { useTranslation } from 'react-i18next'

function TotalLoanCard() {
	const { totalInstallmentsVsLoans } = useBadgets()

	const { t } = useTranslation()

	const { amount, max } = totalInstallmentsVsLoans

	if (max === 0) return null

	return (
		<BudgetCard
			name={t('label_total_loans')}
			amount={amount}
			max={max}
			bgColor='totalLoans'
			type={BUDGET_TYPES.loan}
			isTotal
		/>
	)
}

export default TotalLoanCard
