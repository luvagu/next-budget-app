import { Fragment, useState } from 'react'
import { useBadgets } from '../context/BudgetsContext'
import AddBudget from './AddBudget'
import AddExpense from './AddExpense'
import Button from './shared/Button'
import Stack from './shared/Stack'

function Header() {
	const {
		openAddBudgetModal,
		toggleBudgetModal,
		openAddExpenseModal,
		toggleExpenseModal,
		openExpenseModalWithId,
	} = useBadgets()

	return (
		<Fragment>
			<Stack direction='horizontal' extraClass='gap-2 mb-4'>
				<h1 className='text-3xl font-semibold mr-auto'>Budgets</h1>
				<Button onClick={toggleBudgetModal}>Add Budget</Button>
				<Button onClick={openExpenseModalWithId} variant='blue-outline'>
					Add Expense
				</Button>
			</Stack>
			<AddBudget isOpen={openAddBudgetModal} closeModal={toggleBudgetModal} />
			<AddExpense
				isOpen={openAddExpenseModal}
				closeModal={toggleExpenseModal}
			/>
		</Fragment>
	)
}

export default Header
