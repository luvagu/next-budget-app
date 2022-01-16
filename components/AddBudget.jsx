import { useBadgets } from '../context/BudgetsContext'
import Button from './shared/Button'
import Modal from './shared/Modal'

function AddBudget({ isOpen, closeModal }) {
	const { addBudget } = useBadgets()

	const handleSubmit = form => {
		form.preventDefault()

		const { name, max } = Object.fromEntries(
			new FormData(form.target).entries()
		)

		addBudget({ name, max: parseFloat(max) })
		closeModal()
	}

	return (
		<Modal title='New Budget' isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
				<label className='block'>
					<span className='text-gray-700'>Name</span>
					<input
						type='text'
						name='name'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						placeholder=''
						required
					/>
				</label>
				<label className='block'>
					<span className='text-gray-700'>Maximun spending</span>
					<input
						type='number'
						name='max'
						min={0}
						step={0.01}
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						placeholder=''
						required
					/>
				</label>
				<div className='flex justify-end mt-1'>
					<Button type='submit'>Add</Button>
				</div>
			</form>
		</Modal>
	)
}

export default AddBudget
