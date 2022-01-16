import { useBadgets } from '../context/BudgetsContext'
import { curencyFormatter } from '../utils/helpers'
import Button from './shared/Button'
import Card from './shared/Card'
import ProgressBar from './shared/ProgressBar'
import Stack from './shared/Stack'

function BudgetCard({ id, name, amount, max, gray }) {
	const { openAddExpenseModalWithId, openViewExpenseModalWithId } = useBadgets()

	return (
		<Card bgColor={amount > max ? 'bg-red-100' : gray ? 'bg-gray-100' : null}>
			<h2 className='flex justify-between items-baseline text-gray-500 font-semibold text-xl whitespace-nowrap mb-3'>
				<div className='mr-2'>{name}</div>
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
					>
						View Expenses
					</Button>
				</Stack>
			)}
		</Card>
	)
}

export default BudgetCard
