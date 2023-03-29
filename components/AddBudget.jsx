import {
	BUDGET_TYPE_DEFAULT,
	BUDGET_TYPE_INSTALLMENTS,
	useBadgets,
} from '../context/BudgetsContext'
import { capitalizeWords } from '../utils/helpers'
import Button from './shared/Button'
import Modal from './shared/Modal'
import Stack from './shared/Stack'

function AddBudget({ isOpen, closeModal }) {
	const { addBudget } = useBadgets()

	const handleSubmit = form => {
		form.preventDefault()

		const { name, max, type } = Object.fromEntries(
			new FormData(form.target).entries()
		)

		addBudget({ name: capitalizeWords(name), max: parseFloat(max), type })
		closeModal()
	}

	return (
		<Modal title='Add Budget' isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
				<label className='block'>
					<span className='text-gray-700 text-sm sm:text-base'>Name</span>
					<input
						type='text'
						name='name'
						className='mt-1 block w-full rounded-md text-sm sm:text-base border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						placeholder=''
						required
					/>
				</label>
				<label className='block'>
					<span className='text-gray-700 text-sm sm:text-base'>
						Maximun spending / Loan amount
					</span>
					<input
						type='number'
						name='max'
						min={0}
						step={0.01}
						className='mt-1 block w-full rounded-md text-sm sm:text-base border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						placeholder=''
						required
					/>
				</label>
				<div className='block'>
					<span className='text-gray-700 text-sm sm:text-base'>
						Budget Type
					</span>
					<Stack extraClass='mt-1'>
						<label className='inline-flex items-center'>
							<input
								type='radio'
								name='type'
								defaultValue={BUDGET_TYPE_DEFAULT}
								className='border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50'
								defaultChecked
								required
							/>
							<span className='ml-2 text-gray-700 text-sm sm:text-base'>
								Default
							</span>
						</label>
						<label className='inline-flex items-center'>
							<input
								type='radio'
								name='type'
								defaultValue={BUDGET_TYPE_INSTALLMENTS}
								className='border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50'
								required
							/>
							<span className='ml-2 text-gray-700 text-sm sm:text-base'>
								Installments Tracker
							</span>
						</label>
					</Stack>
				</div>
				<div className='flex justify-end mt-1'>
					<Button type='submit'>Add</Button>
				</div>
			</form>
		</Modal>
	)
}

export default AddBudget
