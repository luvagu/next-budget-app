import { useUser } from '@auth0/nextjs-auth0'
import { Fragment } from 'react'
import { useBadgets } from '../context/BudgetsContext'
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline'
import AddBudget from './AddBudget'
import AddExpense from './AddExpense'
import Button from './shared/Button'
import Stack from './shared/Stack'
import ViewExpenses from './ViewExpenses'
import LinkButton from './shared/LinkButton'
import { getFirstInitial } from '../utils/helpers'
import BudgetNameError from './BudgetNameError'

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
		isDuplicateBudget,
		toggleBudgetNameErrorModal,
	} = useBadgets()

	const userHeaderTitle = user ? (
		<Fragment>
			<span className='text-blue-600 mr-1'>
				{getFirstInitial(user?.name)}&apos;
			</span>
			<span>Budgets</span>
		</Fragment>
	) : (
		'Budgets'
	)

	return (
		<Fragment>
			<Stack direction='horizontal' extraClass='gap-2 mb-4'>
				<h1 className='text-3xl font-semibold mr-auto'>{userHeaderTitle}</h1>
				{user ? (
					<Fragment>
						<Button onClick={toggleAddBudgetModal}>Add Budget</Button>
						<Button onClick={openAddExpenseModalWithId} variant='blue-outline'>
							Add Expense
						</Button>
						<LinkButton href='/api/auth/logout' variant='gray-outline'>
							<LogoutIcon className='h-5 w-5' /> <span>Log Out</span>
						</LinkButton>
					</Fragment>
				) : (
					<LinkButton href='/api/auth/login'>
						<LoginIcon className='h-5 w-5' /> <span>Log In</span>
					</LinkButton>
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
					<BudgetNameError
						isOpen={isDuplicateBudget}
						closeModal={toggleBudgetNameErrorModal}
					/>
				</Fragment>
			)}
		</Fragment>
	)
}

export default Header
