import {
	EXPENSE_TYPE_DEFAULT,
	EXPENSE_TYPE_INSTALLMENT,
	UNCATEGORIZED_BUDGET_ID,
	useBadgets,
} from '../context/BudgetsContext'
import { capitalizeWords } from '../utils/helpers'
import Button from './shared/Button'
import Modal from './shared/Modal'

function AddExpense({ isOpen, closeModal }) {
	const {
		addExpense,
		budgetsTypeLoan,
		budgetsTypeDefault,
		openViewExpenseModalWithId,
		defaultBudget,
		isBudgetTypeLoan,
	} = useBadgets()

	const handleSubmit = form => {
		form.preventDefault()

		const { budgetId, amount, description } = Object.fromEntries(
			new FormData(form.target).entries()
		)

		addExpense({
			budgetId: isBudgetTypeLoan ? defaultBudget.id : budgetId,
			description: capitalizeWords(description),
			amount: parseFloat(amount),
			type: isBudgetTypeLoan ? EXPENSE_TYPE_INSTALLMENT : EXPENSE_TYPE_DEFAULT,
		})
		closeModal()
		openViewExpenseModalWithId(isBudgetTypeLoan ? defaultBudget.id : budgetId)
	}

	return (
		<Modal
			title={`Add ${isBudgetTypeLoan ? 'Installment' : 'Expense'}`}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
				<label className='block'>
					<span className='text-gray-700 text-sm sm:text-base'>
						Description
					</span>
					<input
						type='text'
						name='description'
						className='mt-1 block w-full rounded-md text-sm sm:text-base border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						placeholder=''
						required
					/>
				</label>
				<label className='block'>
					<span className='text-gray-700 text-sm sm:text-base'>Amount</span>
					<input
						type='number'
						name='amount'
						min={0}
						step={0.01}
						className='mt-1 block w-full rounded-md text-sm sm:text-base border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						placeholder=''
						required
					/>
				</label>
				<label className='block'>
					<span className='text-gray-700 text-sm sm:text-base'>Budget</span>
					<select
						name='budgetId'
						className='mt-1 block w-full rounded-md text-sm sm:text-base border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:text-gray-500'
						defaultValue={defaultBudget.id}
						disabled={isBudgetTypeLoan}
					>
						<option value={UNCATEGORIZED_BUDGET_ID}>
							{UNCATEGORIZED_BUDGET_ID}
						</option>
						{(isBudgetTypeLoan ? budgetsTypeLoan : budgetsTypeDefault)?.map(
							({ id, name }) => (
								<option key={id} value={id}>
									{name}
								</option>
							)
						)}
					</select>
				</label>
				<div className='flex justify-end mt-1'>
					<Button type='submit'>Add</Button>
				</div>
			</form>
		</Modal>
	)
}

export default AddExpense
