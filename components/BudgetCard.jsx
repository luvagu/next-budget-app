import {
	PencilIcon,
	TrashIcon,
	EyeIcon,
	PlusIcon,
} from '@heroicons/react/24/outline'
import {
	BUDGET_CARD_BG_COLORS,
	BUDGET_TYPES,
	UNCATEGORIZED_BUDGET_ID,
	useBadgets,
} from '@/context/BudgetsContext'
import { curencyFormatter } from '@/utils/helpers'
import { Button, Card, ProgressBar, Stack } from '@/components/shared'
import { useTranslation } from 'next-i18next'

function BudgetCard({ id, name, amount, max, type, bgColor, isTotal }) {
	const {
		getBudgetExpenses,
		openAddExpenseModalWithId,
		openViewExpenseModalWithId,
		openUpdateBudgetModalWithId,
		openConfirmDeleteModalWithTypeAndId,
	} = useBadgets()

	const isOverBudget = amount >= max
	const hasBudgetExpenses = !!getBudgetExpenses(id)?.length
	const isUncategorizedBudget = id === UNCATEGORIZED_BUDGET_ID
	const isBudgetTypeLoan = type === BUDGET_TYPES.loan
	const customBgColor =
		BUDGET_CARD_BG_COLORS[isBudgetTypeLoan ? 'loan' : bgColor] || 'bg-white'

	return (
		<Card
			bgColor={
				isOverBudget
					? isBudgetTypeLoan
						? BUDGET_CARD_BG_COLORS['loanPaid']
						: BUDGET_CARD_BG_COLORS['budgetMax']
					: customBgColor
			}
		>
			<h2 className='flex justify-between items-baseline text-gray-600 font-semibold text-base sm:text-lg md:text-xl mb-3 whitespace-nowrap'>
				<div className='flex-1 mr-2 text-ellipsis overflow-hidden'>{name}</div>
				<div className='flex items-baseline'>
					{curencyFormatter(amount)}
					{max && (
						<span className='text-sm md:text-base text-gray-400 ml-1'>
							/ {curencyFormatter(max)}
							{isTotal && '*'}
						</span>
					)}
				</div>
			</h2>

			{max && (
				<ProgressBar
					current={amount}
					max={max}
					isBudgetTypeLoan={isBudgetTypeLoan}
					isTotal={isTotal}
				/>
			)}

			{isTotal && (
				<p className='text-gray-600 text-xs mt-3'>
					* Total amount does not account for budgets of type{' '}
					<strong className='text-sky-600'>loan</strong>.
				</p>
			)}

			{id && (
				<Stack direction='horizontal' className='gap-2 mt-4 justify-end'>
					{!isUncategorizedBudget && (
						<>
							<Button
								variant='blue-outline'
								size='sm'
								onClick={() => openUpdateBudgetModalWithId(id)}
							>
								<PencilIcon className='h-4 w-4' />
							</Button>
							<Button
								variant='red-outline'
								size='sm'
								onClick={() =>
									openConfirmDeleteModalWithTypeAndId({
										type: 'budget',
										id,
										name,
									})
								}
							>
								<TrashIcon className='h-4 w-4' />
							</Button>
						</>
					)}
					<Button
						variant='blue-outline'
						size='sm'
						onClick={() => openAddExpenseModalWithId(id)}
					>
						<PlusIcon className='h-4 w-4' />
						<span>{isBudgetTypeLoan ? 'Installment' : 'Expense'}</span>
					</Button>
					<Button
						onClick={() => openViewExpenseModalWithId(id)}
						variant='indigo-outline'
						size='sm'
						disabled={!hasBudgetExpenses}
					>
						<EyeIcon className='h-4 w-4' />
						<span>{isBudgetTypeLoan ? 'Installments' : 'Expenses'}</span>
					</Button>
				</Stack>
			)}
		</Card>
	)
}

export default BudgetCard
