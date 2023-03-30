import { ExclamationIcon } from '@heroicons/react/outline'
import { useBadgets } from '../context/BudgetsContext'
import { capitalizeWords } from '../utils/helpers'
import Button from './shared/Button'
import Modal from './shared/Modal'
import Stack from './shared/Stack'

function ConfirmDelete({ isOpen, closeModal }) {
	const {
		defaultBudget,
		deleteData,
		deleteDataCallback,
		openViewExpenseModalWithId,
		getBudgetExpenses,
		isBudgetTypeLoan,
	} = useBadgets()

	const { name, type, id } = deleteData
	const hasBudgetGotExpenses = !!getBudgetExpenses(id)?.length

	const title = (
		<Stack direction='horizontal' extraClass='gap-2'>
			<ExclamationIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
			<div>Confirm Delete</div>
		</Stack>
	)

	const handleCancel = () => {
		closeModal()

		if (type === 'expense' || type === 'installment') {
			openViewExpenseModalWithId(defaultBudget.id)
		}
	}

	const handleDelete = () => {
		deleteDataCallback()

		if (type === 'expense' || type === 'installment') {
			openViewExpenseModalWithId(defaultBudget.id)
		}
	}

	return (
		<Modal title={title} isOpen={isOpen} closeModal={handleCancel}>
			<p className='text-base text-gray-500'>
				Are you sure you want to delete [{capitalizeWords(type)}] [{name}]?
			</p>
			{type === 'budget' && hasBudgetGotExpenses && (
				<p className='text-base text-gray-500 mt-2'>
					<strong>Note</strong>:{' '}
					{isBudgetTypeLoan ? (
						<>This budget&apos;s installments will be deleted</>
					) : (
						<>
							This budget&apos;s expenses, will be moved to the [Budget]
							[Uncategorized]
						</>
					)}
				</p>
			)}
			<Stack direction='horizontal' extraClass='gap-2 mt-6 justify-end'>
				<Button variant='gray-outline' onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant='red' onClick={handleDelete}>
					Delete
				</Button>
			</Stack>
		</Modal>
	)
}

export default ConfirmDelete
