import { useUser } from '@auth0/nextjs-auth0'
import { Fragment } from 'react'
import Link from 'next/link'
import { useBadgets } from '../context/BudgetsContext'
import {
	CashIcon,
	LoginIcon,
	LogoutIcon,
	PlusIcon,
} from '@heroicons/react/outline'
import AddBudget from './AddBudget'
import AddExpense from './AddExpense'
import Button from './shared/Button'
import Stack from './shared/Stack'
import ViewExpenses from './ViewExpenses'
import UpdateBudget from './UpdateBudget'
import UpdateExpense from './UpdateExpense'
import LinkButton from './shared/LinkButton'
import { getFirstInitial } from '../utils/helpers'
import BudgetNameError from './BudgetNameError'
import ConfirmDelete from './ConfirmDelete'

function Header({ isHome, isDashboard }) {
	const { user } = useUser()

	const {
		openAddBudgetModal,
		toggleAddBudgetModal,
		openAddExpenseModal,
		toggleAddExpenseModal,
		openAddExpenseModalWithId,
		openUpdateBudgetModal,
		openUpdateExpenseModal,
		openViewExpenseModal,
		toggleUpdateBudgetModal,
		toggleUpdateExpenseModal,
		toggleViewExpenseModal,
		isDuplicateBudget,
		toggleBudgetNameErrorModal,
		openConfirmDeteleModal,
		toggleConfirmDeleteModal,
	} = useBadgets()

	return (
		<Fragment>
			<Stack direction='horizontal' extraClass='gap-2 mb-4'>
				<h1 className='inline-flex items-center gap-1 text-2xl sm:text-3xl font-semibold mr-auto'>
					{user ? (
						<Fragment>
							<CashIcon className='text-blue-600 h-8 w-8 sm:h-10 sm:w-10' />
							<span className='text-blue-600'>
								{getFirstInitial(user?.name)}&apos;
							</span>
							<span className='hidden sm:inline-block'>Budgets</span>
							<span className='sm:hidden'>B</span>
						</Fragment>
					) : (
						'Budgets & Expenses'
					)}
				</h1>
				{isHome && (
					<Link href='/api/auth/login' passHref>
						<LinkButton>
							<LoginIcon className='h-5 w-5' />
							<span>Log In</span>
						</LinkButton>
					</Link>
				)}
				{user && isDashboard && (
					<Fragment>
						<Button onClick={toggleAddBudgetModal}>
							<PlusIcon className='h-5 w-5' />
							<span>Budget</span>
						</Button>
						<Button onClick={openAddExpenseModalWithId} variant='blue-outline'>
							<PlusIcon className='h-5 w-5' />

							<span>Expense</span>
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
					<UpdateBudget
						isOpen={openUpdateBudgetModal}
						closeModal={toggleUpdateBudgetModal}
					/>
					<UpdateExpense
						isOpen={openUpdateExpenseModal}
						closeModal={toggleUpdateExpenseModal}
					/>
					<BudgetNameError
						isOpen={isDuplicateBudget}
						closeModal={toggleBudgetNameErrorModal}
					/>
					<ConfirmDelete
						isOpen={openConfirmDeteleModal}
						closeModal={toggleConfirmDeleteModal}
					/>
				</Fragment>
			)}
		</Fragment>
	)
}

export default Header
