import { useBadgets } from '../context/BudgetsContext'
import { curencyFormatter } from '../utils/helpers'
import Button from './shared/Button'
import Card from './shared/Card'
import ProgressBar from './shared/ProgressBar'
import Stack from './shared/Stack'

function BudgetCard({ id, name, amount, max, gray }) {
	const {
		getBudgetExpenses,
		openAddExpenseModalWithId,
		openViewExpenseModalWithId,
	} = useBadgets()

	const hasBudgetExpenses = !!getBudgetExpenses(id)?.length

	return (
		<Card bgColor={amount > max ? 'bg-red-100' : gray ? 'bg-gray-100' : null}>
			<h2 className='flex justify-between items-baseline text-gray-600 font-semibold text-xl mb-3 whitespace-nowrap'>
				<div className='flex-1 mr-2 text-ellipsis overflow-hidden'>{name}</div>
				<div className='flex items-baseline'>
					{curencyFormatter(amount)}
					{max && (
						<span className='text-base text-gray-400 ml-1'>
							/ {curencyFormatter(max)}
						</span>
					)}
				</div>
			</h2>

			{max && <ProgressBar current={amount} max={max} />}

			{id && (
				<Stack direction='horizontal' extraClass='gap-2 mt-4'>
					<Button
						onClick={() => openAddExpenseModalWithId(id)}
						extraClass='ml-auto'
					>
						Add Expense
					</Button>
					<Button
						onClick={() => openViewExpenseModalWithId(id)}
						variant='gray-outline'
						color='gray'
						disabled={!hasBudgetExpenses}
					>
						View Expenses
					</Button>
				</Stack>
			)}
		</Card>
	)
}

export default BudgetCard
