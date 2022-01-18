import { UNCATEGORIZED_BUDGET_ID, useBadgets } from '../context/BudgetsContext'
import Button from './shared/Button'
import Modal from './shared/Modal'

function AddExpense({ isOpen, closeModal }) {
	const { addExpense, budgets, defaultBudgetId } = useBadgets()

	const handleSubmit = form => {
		form.preventDefault()

		const { budgetId, amount, description } = Object.fromEntries(
			new FormData(form.target).entries()
		)

		addExpense({ budgetId, amount: parseFloat(amount), description })
		closeModal()
	}

	return (
		<Modal title='New Expense' isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
				<label className='block'>
					<span className='text-gray-700'>Description</span>
					<input
						type='text'
						name='description'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						placeholder=''
						required
					/>
				</label>
				<label className='block'>
					<span className='text-gray-700'>Amount</span>
					<input
						type='number'
						name='amount'
						min={0}
						step={0.01}
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						placeholder=''
						required
					/>
				</label>
				<label className='block'>
					<span className='text-gray-700'>Budget</span>
					<select
						name='budgetId'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						defaultValue={defaultBudgetId}
					>
						<option value={UNCATEGORIZED_BUDGET_ID}>
							{UNCATEGORIZED_BUDGET_ID}
						</option>
						{budgets?.map(({ id, name }) => (
							<option key={id} value={id}>
								{name}
							</option>
						))}
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
