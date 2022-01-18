import { useBadgets } from '../context/BudgetsContext'
import Modal from './shared/Modal'
import Stack from './shared/Stack'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import Button from './shared/Button'

function BudgetNameError({ isOpen, closeModal }) {
	const { toggleAddBudgetModal, toggleBudgetNameErrorModal } = useBadgets()

	const renderTitleWithIcon = () => {
		return (
			<Stack direction='horizontal' extraClass='gap-2'>
				<ExclamationCircleIcon
					className='h-6 w-6 text-red-600'
					aria-hidden='true'
				/>
				<div>Opps!</div>
			</Stack>
		)
	}

	return (
		<Modal title={renderTitleWithIcon} isOpen={isOpen} closeModal={closeModal}>
			<div className='grid grid-cols-1 gap-4'>
				<p className='text-base text-gray-500'>
					Your budget was not added. Budget name must be unique. Please try
					again!
				</p>
				<div className='flex justify-end mt-1 gap-2'>
					<Button variant='gray-outline' onClick={toggleBudgetNameErrorModal}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							toggleBudgetNameErrorModal()
							toggleAddBudgetModal()
						}}
					>
						Add Budget
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default BudgetNameError
