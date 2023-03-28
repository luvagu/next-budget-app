import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline'
import { useBadgets } from '../context/BudgetsContext'
import { curencyFormatter } from '../utils/helpers'
import Button from './shared/Button'
import Modal from './shared/Modal'
import Stack from './shared/Stack'

function ViewExpenses({ isOpen, closeModal }) {
	const {
		defaultBudgetId,
		getBudgetExpenses,
		getDefaultBudget,
		openUpdateExpenseModalWithData,
		openAddExpenseModalWithId,
		openConfirmDeleteModalWithTypeAndId,
	} = useBadgets()

	const budget = getDefaultBudget()
	const budgetExpenses = getBudgetExpenses(defaultBudgetId)

	const renderTitle = (
		<>
			<span className='flex-1'>
				<span className=' text-blue-600'>{budget?.name}&apos;s</span> Expenses
			</span>
			<Button
				variant='blue-outline'
				size='sm'
				onClick={() => {
					openAddExpenseModalWithId(defaultBudgetId)
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
								openUpdateExpenseModalWithData(budget?.id, {
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
									type: 'expense',
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
