import { useBadgets } from '@/context/BudgetsContext'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Button, Modal, Stack } from '@/components/shared'

function BudgetNameError({ isOpen, closeModal }) {
	const { toggleAddBudgetModal, toggleBudgetNameErrorModal } = useBadgets()

	const title = (
		<Stack direction='horizontal' className='gap-2'>
			<ExclamationCircleIcon
				className='h-6 w-6 text-red-600'
				aria-hidden='true'
			/>
			<div>Opps!</div>
		</Stack>
	)

	return (
		<Modal title={title} isOpen={isOpen} closeModal={closeModal}>
			<p className='text-base text-gray-500'>
				Your budget was not added. Budget name must be unique. Please try again!
			</p>
			<Stack direction='horizontal' className='gap-2 mt-6 justify-end'>
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
			</Stack>
		</Modal>
	)
}

export default BudgetNameError
