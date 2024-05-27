import { ExclamationTriangleIcon as ExclamationIcon } from '@heroicons/react/24/outline'
import { DELETE_TYPE, useBadgets } from '@/context/BudgetsContext'
import { capitalizeWords } from '@/utils/helpers'
import { Button, Modal, Stack } from '@/components/shared'
import { Trans, useTranslation } from 'react-i18next'

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

	const { t } = useTranslation()

	const title = (
		<Stack direction='horizontal' className='gap-2'>
			<ExclamationIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
			<div>{t('confirm_delete')}</div>
		</Stack>
	)

	const handleCancel = () => {
		closeModal()

		if (
			type === DELETE_TYPE.expenseDefault ||
			type === DELETE_TYPE.expenseInstallment
		) {
			openViewExpenseModalWithId(defaultBudget.id)
		}
	}

	const handleDelete = () => {
		deleteDataCallback()

		if (
			type === DELETE_TYPE.expenseDefault ||
			type === DELETE_TYPE.expenseInstallment
		) {
			openViewExpenseModalWithId(defaultBudget.id)
		}
	}

	return (
		<Modal title={title} isOpen={isOpen} closeModal={handleCancel}>
			<p className='text-base text-gray-500'>
				<Trans i18nKey={'confirm_delete_message'} values={{ type, name }} />
			</p>
			{type === 'budget' && hasBudgetGotExpenses && (
				<p className='text-base text-gray-500 mt-2'>
					<Trans
						i18nKey={
							isBudgetTypeLoan
								? 'confirm_delete_budget_note'
								: 'confirm_delete_loan_note'
						}
					/>
				</p>
			)}
			<Stack direction='horizontal' className='gap-2 mt-6 justify-end'>
				<Button variant='gray-outline' onClick={handleCancel}>
					{t('label_cancel')}
				</Button>
				<Button variant='red' onClick={handleDelete}>
					{t('label_delete')}
				</Button>
			</Stack>
		</Modal>
	)
}

export default ConfirmDelete
