import { calculatePercent, classNames, curencyFormatter } from '@/utils/helpers'
import { Trans } from 'react-i18next'

const getVariant = ({ percent, isBudgetTypeLoan }) => {
	const variants = {
		blue: 'bg-blue-500',
		green: 'bg-green-500',
		red: 'bg-red-500',
		yellow: 'bg-yellow-500',
	}

	if (percent < 25) return isBudgetTypeLoan ? variants.red : variants.green
	if (percent < 50) return isBudgetTypeLoan ? variants.yellow : variants.blue
	if (percent < 75) return isBudgetTypeLoan ? variants.blue : variants.yellow

	return isBudgetTypeLoan ? variants.green : variants.red
}

function ProgressBar({ current, max, isBudgetTypeLoan, isInModal, isTotal }) {
	const percent = calculatePercent(current, max)
	const remaining = max - current
	const isOverBudget = current > max
	const isAtMaxBudget = remaining === 0

	const budgetTypeLoanText = (
		<Trans
			i18nKey={
				isAtMaxBudget
					? isTotal
						? 'total_loans_paid_in_full'
						: 'loan_paid_in_full'
					: isOverBudget
					? isTotal
						? 'total_loans_overpaid_by_amount'
						: 'loan_overpaid_by_amount'
					: isTotal
					? 'total_loans_is_amount_away_from_maxed_out'
					: 'loan_is_amount_away_from_maxing_out'
			}
			values={{ amount: curencyFormatter(remaining) }}
		/>
	)

	const budgetTypeDefaultText = (
		<Trans
			i18nKey={
				isAtMaxBudget
					? isTotal
						? 'total_budgets_maxed_out'
						: 'budget_maxed_out'
					: isOverBudget
					? isTotal
						? 'total_budgets_gone_over_by_amount'
						: 'budget_gone_over_by_amount'
					: isTotal
					? 'total_budgets_is_amount_away_from_maxed_out'
					: 'budget_is_amount_away_from_maxed_out'
			}
			values={{ amount: curencyFormatter(remaining) }}
		/>
	)

	const progressBarTopText = isBudgetTypeLoan
		? budgetTypeLoanText
		: budgetTypeDefaultText

	return (
		<>
			<p
				className={classNames(
					'mb-1',
					isInModal ? 'text-xs sm:text-sm text-center leading-none' : 'text-xs'
				)}
			>
				{progressBarTopText}
			</p>
			<div
				className={classNames(
					isInModal ? 'relative h-5' : 'h-4',
					'w-full bg-gray-300 rounded-lg shadow-inner overflow-hidden transition'
				)}
			>
				<div
					className={classNames(
						isInModal ? 'h-5' : 'h-4',
						getVariant({ percent, isBudgetTypeLoan }),
						'transition-[width] duration-500'
					)}
					style={{ width: `${percent}%` }}
				/>
				{isInModal && (
					<div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs sm:text-sm text-black font-medium'>
						{curencyFormatter(current)} / {curencyFormatter(max)}
					</div>
				)}
			</div>
		</>
	)
}

export default ProgressBar
