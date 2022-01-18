import { UNCATEGORIZED_BUDGET_ID, useBadgets } from '../context/BudgetsContext'
import { curencyFormatter } from '../utils/helpers'
import Button from './shared/Button'
import Modal from './shared/Modal'
import Stack from './shared/Stack'

function ViewExpenses({ isOpen, closeModal }) {
	const {
		budgets,
		defaultBudgetId,
		getBudgetExpenses,
		deleteBudget,
		deleteExpense,
	} = useBadgets()

	const budget =
		defaultBudgetId === UNCATEGORIZED_BUDGET_ID
			? { id: UNCATEGORIZED_BUDGET_ID, name: UNCATEGORIZED_BUDGET_ID }
			: budgets.find(budget => budget.id === defaultBudgetId)

	const expenses = getBudgetExpenses(defaultBudgetId)

	const renderTitleWithButton = () => {
		return (
			<Stack direction='horizontal' extraClass='gap-2'>
				<div>Expenses - {budget?.name}</div>
				{defaultBudgetId !== UNCATEGORIZED_BUDGET_ID && (
					<Button
						variant='red-outline'
						size='sm'
						onClick={() => {
							deleteBudget(budget?.id)
							closeModal()
						}}
					>
						Delete
					</Button>
				)}
			</Stack>
		)
	}

	return (
		<Modal
			title={renderTitleWithButton}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Stack extraClass='gap-3'>
				{expenses?.map(({ id, amount, description }) => (
					<Stack key={id} direction='horizontal' extraClass='gap-2'>
						<div className='mr-auto text-xl'>{description}</div>
						<div className='text-lg'>{curencyFormatter(amount)}</div>
						<Button
							variant='red-outline'
							size='sm'
							onClick={() => deleteExpense(id)}
						>
							&times;
						</Button>
					</Stack>
				))}
			</Stack>
		</Modal>
	)
}

export default ViewExpenses
