import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline'
import { useBadgets } from '../context/BudgetsContext'
import { curencyFormatter } from '../utils/helpers'
import Button from './shared/Button'
import Modal from './shared/Modal'
import Stack from './shared/Stack'

function ViewExpenses({ isOpen, closeModal }) {
	const {
		getBudgetExpenses,
		openUpdateExpenseModalWithData,
		openAddExpenseModalWithId,
		openConfirmDeleteModalWithTypeAndId,
		defaultBudget,
		isBudgetTypeLoan,
	} = useBadgets()

	const budgetExpenses = getBudgetExpenses(defaultBudget.id)

	const renderTitle = (
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
				<span>Expense</span>
			</Button>
		</>
	)

	return (
		<Modal title={renderTitle} isOpen={isOpen} closeModal={closeModal}>
			<Stack extraClass='gap-2'>
				{budgetExpenses?.map(({ id, amount, description }) => (
					<Stack
						key={id}
						direction='horizontal'
						extraClass='gap-2 hover:bg-slate-100'
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
