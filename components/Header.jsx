import { useUser } from '@auth0/nextjs-auth0'
import { Fragment } from 'react'
import Link from 'next/link'
import { useBadgets } from '../context/BudgetsContext'
import { CashIcon, LoginIcon, LogoutIcon } from '@heroicons/react/outline'
import AddBudget from './AddBudget'
import AddExpense from './AddExpense'
import Button from './shared/Button'
import Stack from './shared/Stack'
import ViewExpenses from './ViewExpenses'
import LinkButton from './shared/LinkButton'
import { getFirstInitial } from '../utils/helpers'
import BudgetNameError from './BudgetNameError'

function Header({ isHome, isDashboard }) {
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
			<span className='hidden sm:inline-block'>Budgets</span>
			<span className='sm:hidden'>B</span>
		</Fragment>
	) : (
		'Budgets'
	)

	return (
		<Fragment>
			<Stack direction='horizontal' extraClass='gap-2 mb-4'>
				<h1 className='text-2xl sm:text-3xl font-semibold mr-auto'>
					{userHeaderTitle}
				</h1>
				{isHome && (
					<Link href='/dashboard' passHref>
						<LinkButton>
							{user ? (
								<CashIcon className='h-5 w-5' />
							) : (
								<LoginIcon className='h-5 w-5' />
							)}
							<span>{user ? 'Dashboard' : 'Log In'}</span>
						</LinkButton>
					</Link>
				)}
				{user && isDashboard && (
					<Fragment>
						<Button onClick={toggleAddBudgetModal}>Add Budget</Button>
						<Button onClick={openAddExpenseModalWithId} variant='blue-outline'>
							Add Expense
						</Button>
					</Fragment>
				)}
				{user && (
					<LinkButton href='/api/auth/logout' variant='gray-outline'>
						<LogoutIcon className='h-5 w-5' /> <span>Log Out</span>
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
