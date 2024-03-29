import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import {
	DELETE_TYPE,
	UNCATEGORIZED_BUDGET_ID,
	useBadgets,
} from '@/context/BudgetsContext'
import { curencyFormatter, dateFormatter } from '@/utils/helpers'
import { Button, Modal, ProgressBar, Stack } from '@/components/shared'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

function ViewExpenses({ isOpen, closeModal }) {
	const {
		getBudgetExpenses,
		openUpdateExpenseModalWithData,
		openAddExpenseModalWithId,
		openConfirmDeleteModalWithTypeAndId,
		defaultBudget,
		isBudgetTypeLoan,
		getBudgetExpensesAmount,
	} = useBadgets()

	const budgetExpenses = getBudgetExpenses(defaultBudget.id)

	const router = useRouter()
	const { t } = useTranslation()

	const title = (
		<>
			<span className='flex-1'>
				<span className=' text-blue-600'>{defaultBudget?.name}&apos;s</span>{' '}
				{t(isBudgetTypeLoan ? 'label_installments' : 'label_expenses')}
			</span>
			<Button
				variant='blue-outline'
				size='sm'
				onClick={() => {
					openAddExpenseModalWithId(defaultBudget.id)
					closeModal()
				}}
			>
				<PlusIcon className='h-4 w-4' />
				<span>
					{t(isBudgetTypeLoan ? 'label_installment' : 'label_expense')}
				</span>
			</Button>
		</>
	)

	const progress = defaultBudget.id !== UNCATEGORIZED_BUDGET_ID && (
		<ProgressBar
			current={getBudgetExpensesAmount(defaultBudget.id)}
			max={defaultBudget.max}
			isBudgetTypeLoan={isBudgetTypeLoan}
			isInModal
		/>
	)

	return (
		<Modal
			title={title}
			isOpen={isOpen}
			closeModal={closeModal}
			progress={progress}
		>
			<Stack className='gap-2'>
				{budgetExpenses?.map(({ id, amount, description, ts }) => (
					<Stack
						key={id}
						direction='horizontal'
						className='gap-2 hover:bg-slate-300 items-baseline'
					>
						<div className='mr-auto text-base sm:text-lg md:text-xl inline-flex flex-col'>
							{description}
							{ts && (
								<span className='text-xs text-gray-600 text-'>
									{dateFormatter(ts, {
										locale: router.locale,
										todayAt: t('helper_date_today_at'),
										yesterdayAt: t('helper_date_yesterday_at'),
									})}
								</span>
							)}
						</div>
						<div className='text-base sm:text-lg md:text-xl'>
							{curencyFormatter(amount)}
						</div>
						<Button
							variant='blue-outline'
							size='sm'
							onClick={() => {
								openUpdateExpenseModalWithData(defaultBudget?.id, {
									id,
									amount,
									description,
								})
								closeModal()
							}}
						>
							<PencilIcon className='h-3 w-3' />
						</Button>
						{!isBudgetTypeLoan && (
							<Button
								variant='red-outline'
								size='sm'
								onClick={() => {
									openConfirmDeleteModalWithTypeAndId({
										type: isBudgetTypeLoan
											? DELETE_TYPE.expenseInstallment
											: DELETE_TYPE.expenseDefault,
										id,
										name: description,
									})
									closeModal()
								}}
							>
								<TrashIcon className='h-3 w-3' />
							</Button>
						)}
					</Stack>
				))}
			</Stack>
		</Modal>
	)
}

export default ViewExpenses
