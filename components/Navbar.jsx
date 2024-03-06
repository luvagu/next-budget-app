import { Fragment } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useBadgets } from '@/context/BudgetsContext'
import { getFirstInitial } from '@/utils/helpers'
import Link from 'next/link'
import AddBudget from '@/components/AddBudget'
import AddExpense from '@/components/AddExpense'
import Button from '@/components/shared/Button'
import Stack from '@/components/shared/Stack'
import ViewExpenses from '@/components/ViewExpenses'
import UpdateBudget from '@/components/UpdateBudget'
import UpdateExpense from '@/components/UpdateExpense'
import LinkButton from '@/components/shared/LinkButton'
import BudgetNameError from '@/components/BudgetNameError'
import ConfirmDelete from '@/components/ConfirmDelete'
import {
	BanknotesIcon as CashIcon,
	ArrowRightEndOnRectangleIcon as LoginIcon,
	ArrowLeftStartOnRectangleIcon as LogoutIcon,
	PlusIcon,
} from '@heroicons/react/24/outline'

function Navbar({ isHome, isDashboard }) {
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
				<h1 className='inline-flex items-center gap-1 text-xl sm:text-2xl md:text-3xl font-semibold mr-auto'>
					{user ? (
						<Fragment>
							<CashIcon className='text-blue-600 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10' />
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
							<LoginIcon className='h-4 w-4 sm:h-5 sm:w-5' />
							<span>Log In</span>
						</LinkButton>
					</Link>
				)}
				{user && isDashboard && (
					<Fragment>
						<Button onClick={toggleAddBudgetModal}>
							<PlusIcon className='h-4 w-4 sm:h-5 sm:w-5' />
							<span>Budget</span>
						</Button>
						<Button onClick={openAddExpenseModalWithId} variant='blue-outline'>
							<PlusIcon className='h-4 w-4 sm:h-5 sm:w-5' />
							<span>Expense</span>
						</Button>
					</Fragment>
				)}
				{user && (
					<LinkButton href='/api/auth/logout' variant='gray-outline'>
						<LogoutIcon className='h-4 w-4 sm:h-5 sm:w-5' />{' '}
						<span>Log Out</span>
					</LinkButton>
				)}
			</Stack>
			{user && (
				<Fragment>
					{openAddBudgetModal && (
						<AddBudget
							isOpen={openAddBudgetModal}
							closeModal={toggleAddBudgetModal}
						/>
					)}
					{openAddExpenseModal && (
						<AddExpense
							isOpen={openAddExpenseModal}
							closeModal={toggleAddExpenseModal}
						/>
					)}
					{openViewExpenseModal && (
						<ViewExpenses
							isOpen={openViewExpenseModal}
							closeModal={toggleViewExpenseModal}
						/>
					)}
					{openUpdateBudgetModal && (
						<UpdateBudget
							isOpen={openUpdateBudgetModal}
							closeModal={toggleUpdateBudgetModal}
						/>
					)}
					{openUpdateExpenseModal && (
						<UpdateExpense
							isOpen={openUpdateExpenseModal}
							closeModal={toggleUpdateExpenseModal}
						/>
					)}
					{isDuplicateBudget && (
						<BudgetNameError
							isOpen={isDuplicateBudget}
							closeModal={toggleBudgetNameErrorModal}
						/>
					)}
					{openConfirmDeteleModal && (
						<ConfirmDelete
							isOpen={openConfirmDeteleModal}
							closeModal={toggleConfirmDeleteModal}
						/>
					)}
				</Fragment>
			)}
		</Fragment>
	)
}

export default Navbar
