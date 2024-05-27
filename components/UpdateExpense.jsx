import { UNCATEGORIZED_BUDGET_ID, useBadgets } from '@/context/BudgetsContext'
import { capitalizeWords, twoDigitsNumber } from '@/utils/helpers'
import { Button, Modal } from '@/components/shared'
import { useTranslation } from 'react-i18next'

function UpdateExpense({ isOpen, closeModal }) {
	const {
		updateExpense,
		budgetsTypeLoan,
		budgetsTypeDefault,
		defaultBudgetId,
		currentExpense,
		openViewExpenseModalWithId,

		isBudgetTypeLoan,
	} = useBadgets()

	const { id: ref, amount, description } = currentExpense

	const handleSubmit = form => {
		form.preventDefault()

		const { budgetId, description, amount } = Object.fromEntries(
			new FormData(form.target).entries()
		)

		updateExpense({
			budgetId: isBudgetTypeLoan ? defaultBudgetId : budgetId,
			description: capitalizeWords(description),
			amount: twoDigitsNumber(parseFloat(amount)),
			ref,
		})
		closeModal()
		openViewExpenseModalWithId(isBudgetTypeLoan ? defaultBudgetId : budgetId)
	}

	const { t } = useTranslation()

	return (
		<Modal
			title={t(isBudgetTypeLoan ? 'update_loan' : 'update_budget')}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
				<label className='block'>
					<span className='text-gray-700'>{t('label_description')}</span>
					<input
						type='text'
						name='description'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						placeholder=''
						defaultValue={description}
						required
					/>
				</label>
				<label className='block'>
					<span className='text-gray-700'>{t('Amount')}</span>
					<input
						type='number'
						name='amount'
						min={0}
						step={0.01}
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						placeholder=''
						defaultValue={amount}
						required
					/>
				</label>
				<label className='block'>
					<span className='text-gray-700'>
						{t(isBudgetTypeLoan ? 'label_loan' : 'label_budget')}
					</span>
					<select
						name='budgetId'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:text-gray-500'
						defaultValue={defaultBudgetId}
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
					<Button type='submit'>{t('label_update')}</Button>
				</div>
			</form>
		</Modal>
	)
}

export default UpdateExpense
