import { useUser } from '@auth0/nextjs-auth0'
import { Fragment } from 'react'
import { useBadgets } from '../context/BudgetsContext'
import { LoginIcon } from '@heroicons/react/outline'
import AddBudget from './AddBudget'
import AddExpense from './AddExpense'
import Button from './shared/Button'
import Stack from './shared/Stack'
import ViewExpenses from './ViewExpenses'

function Header() {
	const { user } = useUser()

	const {
		openAddBudgetModal,
		toggleAddBudgetModal,
		openAddExpenseModal,
		toggleAddExpenseModal,
		openAddExpenseModalWithId,
		openViewExpenseModal,
		toggleViewExpenseModal,
	} = useBadgets()

	return (
		<Fragment>
			<Stack direction='horizontal' extraClass='gap-2 mb-4'>
				<h1 className='text-3xl font-semibold mr-auto'>Budgets</h1>
				{user ? (
					<Fragment>
						<Button onClick={toggleAddBudgetModal}>Add Budget</Button>
						<Button onClick={openAddExpenseModalWithId} variant='blue-outline'>
							Add Expense
						</Button>
					</Fragment>
				) : (
					<Button onClick={toggleAddBudgetModal} extraClass='flex space-x-2'>
						<LoginIcon className='h-6 w-6' /> <span>Log In</span>
					</Button>
				)}
			</Stack>
			{user && (
				<Fragment>
					<AddBudget
						isOpen={openAddBudgetModal}
						closeModal={toggleAddBudgetModal}
					/>
					<AddExpense
						isOpen={openAddExpenseModal}
						closeModal={toggleAddExpenseModal}
					/>
					<ViewExpenses
						isOpen={openViewExpenseModal}
						closeModal={toggleViewExpenseModal}
					/>
				</Fragment>
			)}
		</Fragment>
	)
}

export default Header
