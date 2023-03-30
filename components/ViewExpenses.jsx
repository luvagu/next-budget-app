import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline'
import { UNCATEGORIZED_BUDGET_ID, useBadgets } from '../context/BudgetsContext'
import { curencyFormatter } from '../utils/helpers'
import Button from './shared/Button'
import Modal from './shared/Modal'
import Stack from './shared/Stack'
import ProgressBar from './shared/ProgressBar'

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

	const title = (
		<>
			<span className='flex-1'>
				<span className=' text-blue-600'>{defaultBudget?.name}&apos;s</span>{' '}
				{isBudgetTypeLoan ? 'Installments' : 'Expenses'}
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
				<span>{isBudgetTypeLoan ? 'Installment' : 'Expense'}</span>
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
			<Stack extraClass='gap-2'>
				{budgetExpenses?.map(({ id, amount, description }) => (
					<Stack
						key={id}
						direction='horizontal'
						extraClass='gap-2 hover:bg-slate-300'
					>
						<div className='mr-auto text-base sm:text-lg md:text-xl'>
							{description}
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
						<Button
							variant='red-outline'
							size='sm'
							onClick={() => {
								openConfirmDeleteModalWithTypeAndId({
									type: isBudgetTypeLoan ? 'installment' : 'expense',
									id,
									name: description,
								})
								closeModal()
							}}
						>
							<TrashIcon className='h-3 w-3' />
						</Button>
					</Stack>
				))}
			</Stack>
		</Modal>
	)
}

export default ViewExpenses
