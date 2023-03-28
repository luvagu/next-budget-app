import {
	PencilIcon,
	TrashIcon,
	EyeIcon,
	PlusIcon,
} from '@heroicons/react/outline'
import {
	BUDGET_TYPE_INSTALLMENTS,
	UNCATEGORIZED_BUDGET_ID,
	useBadgets,
} from '../context/BudgetsContext'
import { curencyFormatter } from '../utils/helpers'
import Button from './shared/Button'
import Card from './shared/Card'
import ProgressBar from './shared/ProgressBar'
import Stack from './shared/Stack'

function BudgetCard({ id, name, amount, max, type = null, gray }) {
	const {
		getBudgetExpenses,
		openAddExpenseModalWithId,
		openViewExpenseModalWithId,
		openUpdateBudgetModalWithId,
		openConfirmDeleteModalWithTypeAndId,
	} = useBadgets()

	const hasBudgetExpenses = !!getBudgetExpenses(id)?.length
	const isUncategorizedBudget = id === UNCATEGORIZED_BUDGET_ID
	const isInstallments = type === BUDGET_TYPE_INSTALLMENTS

	return (
		<Card
			bgColor={
				amount >= max
					? isInstallments
						? 'bg-green-100'
						: 'bg-red-100'
					: isInstallments
					? 'bg-sky-100'
					: gray
					? 'bg-gray-100'
					: null
			}
		>
			<h2 className='flex justify-between items-baseline text-gray-600 font-semibold text-base sm:text-lg md:text-xl mb-3 whitespace-nowrap'>
				<div className='flex-1 mr-2 text-ellipsis overflow-hidden'>{name}</div>
				<div className='flex items-baseline'>
					{curencyFormatter(amount)}
					{max && (
						<span className='text-sm md:text-base text-gray-400 ml-1'>
							/ {curencyFormatter(max)}
						</span>
					)}
				</div>
			</h2>

			{max && <ProgressBar current={amount} max={max} type={type} />}

			{id && (
				<Stack direction='horizontal' extraClass='gap-2 mt-4 justify-end'>
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
						<span>Expense</span>
					</Button>
					<Button
						onClick={() => openViewExpenseModalWithId(id)}
						variant='indigo-outline'
						size='sm'
						disabled={!hasBudgetExpenses}
					>
						<EyeIcon className='h-4 w-4' />
						<span>Expenses</span>
					</Button>
				</Stack>
			)}
		</Card>
	)
}

export default BudgetCard
