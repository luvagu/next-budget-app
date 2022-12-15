import { ExclamationIcon } from '@heroicons/react/outline'
import { useBadgets } from '../context/BudgetsContext'
import { capitalizeWords } from '../utils/helpers'
import Button from './shared/Button'
import Modal from './shared/Modal'
import Stack from './shared/Stack'

function ConfirmDelete({ isOpen, closeModal }) {
	const { deleteData, deleteDataCallback } = useBadgets()

	const { name, type } = deleteData

	const renderTitleWithIcon = () => {
		return (
			<Stack direction='horizontal' extraClass='gap-2'>
				<ExclamationIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
				<div>Confirm Delete</div>
			</Stack>
		)
	}

	return (
		<Modal title={renderTitleWithIcon} isOpen={isOpen} closeModal={closeModal}>
			<p className='text-base text-gray-500'>
				Are you sure you want to delete [{capitalizeWords(type)}] [{name}]?
			</p>
			<Stack direction='horizontal' extraClass='gap-2 mt-6 justify-end'>
				<Button
					variant='gray-outline'
					// extraClass='ml-auto'
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button variant='red' onClick={deleteDataCallback}>
					Delete
				</Button>
			</Stack>
		</Modal>
	)
}

export default ConfirmDelete
