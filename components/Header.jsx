import { Fragment, useState } from 'react'
import { useBadgets } from '../context/BudgetsContext'
import AddBudget from './AddBudget'
import AddExpense from './AddExpense'
import Button from './shared/Button'
import Stack from './shared/Stack'
import ViewExpenses from './ViewExpenses'

function Header() {
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
				<Button onClick={toggleAddBudgetModal}>Add Budget</Button>
				<Button onClick={openAddExpenseModalWithId} variant='blue-outline'>
					Add Expense
				</Button>
			</Stack>
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
	)
}

export default Header
