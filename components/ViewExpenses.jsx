import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { UNCATEGORIZED_BUDGET_ID, useBadgets } from '../context/BudgetsContext'
import { curencyFormatter } from '../utils/helpers'
import Button from './shared/Button'
import Modal from './shared/Modal'
import Stack from './shared/Stack'

function ViewExpenses({ isOpen, closeModal }) {
	const {
		defaultBudgetId,
		getBudgetExpenses,
		getDefaultBudget,
		deleteBudget,
		openUpdateBudgetModalWithId,
		openUpdateExpenseModalExpenseData,
		deleteExpense,
		openAddExpenseModalWithId,
	} = useBadgets()

	const budget = getDefaultBudget()
	const budgetExpenses = getBudgetExpenses(defaultBudgetId)

	const renderTitleWithButton = () => {
		return (
			<>
				<span className='flex-1'>
					<span className=' text-blue-600'>{budget?.name}&apos;s</span> Expenses
				</span>
				{defaultBudgetId !== UNCATEGORIZED_BUDGET_ID && (
					<>
						<Button
							variant='blue-outline'
							size='sm'
							onClick={() => {
								openUpdateBudgetModalWithId(budget?.id)
								closeModal()
							}}
						>
							<PencilIcon className='h-4 w-4' />
						</Button>
						<Button
							variant='red-outline'
							size='sm'
							onClick={() => {
								deleteBudget(budget?.id)
								closeModal()
							}}
						>
							<TrashIcon className='h-4 w-4' />
						</Button>
					</>
				)}
			</>
		)
	}

	return (
		<Modal
			title={renderTitleWithButton}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Stack extraClass='gap-2'>
				{budgetExpenses?.length ? (
					budgetExpenses?.map(({ id, amount, description }) => (
						<Stack
							key={id}
							direction='horizontal'
							extraClass='gap-2 hover:bg-slate-100'
						>
							<div className='mr-auto text-xl'>{description}</div>
							<div className='text-lg'>{curencyFormatter(amount)}</div>
							<Button
								variant='blue-outline'
								size='sm'
								onClick={() => {
									openUpdateExpenseModalExpenseData(budget?.id, {
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
								onClick={() => deleteExpense(id)}
							>
								<TrashIcon className='h-3 w-3' />
							</Button>
						</Stack>
					))
				) : (
					<Button
						onClick={() => {
							openAddExpenseModalWithId(defaultBudgetId)
							closeModal()
						}}
						extraClass='mx-auto'
					>
						Add Expense
					</Button>
				)}
			</Stack>
		</Modal>
	)
}

export default ViewExpenses
