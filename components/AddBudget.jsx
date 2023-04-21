import { useState } from 'react'
import {
	defaultBudgetCardBgColors,
	BUDGET_CARD_BG_COLORS,
	BUDGET_TYPES,
	useBadgets,
} from '../context/BudgetsContext'
import { capitalizeWords, classNames, twoDigitsNumber } from '../utils/helpers'
import Button from './shared/Button'
import Modal from './shared/Modal'
import Stack from './shared/Stack'

function AddBudget({ isOpen, closeModal }) {
	const { addBudget } = useBadgets()
	const [isBudgetTypeLoanSelected, setIsBudgetTypeLoanSelected] =
		useState(false)

	const handleSubmit = form => {
		form.preventDefault()

		const { name, max, type, bgColor } = Object.fromEntries(
			new FormData(form.target).entries()
		)

		addBudget({
			name: capitalizeWords(name),
			max: twoDigitsNumber(parseFloat(max)),
			type,
			...(bgColor && { bgColor }),
		})
		closeModal()
	}

	const budgetCardBgColorsToMap = isBudgetTypeLoanSelected
		? [BUDGET_TYPES.loan]
		: defaultBudgetCardBgColors

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
						Budget type
					</span>
					<Stack extraClass='mt-1'>
						<label className='inline-flex items-center'>
							<input
								onChange={e => setIsBudgetTypeLoanSelected(!e.target.checked)}
								type='radio'
								name='type'
								defaultValue={BUDGET_TYPES.default}
								className='border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50'
								defaultChecked
								required
							/>
							<span className='ml-2 text-gray-700 text-sm sm:text-base'>
								Default (expenses tracker)
							</span>
						</label>
						<label className='inline-flex items-center'>
							<input
								onChange={e => setIsBudgetTypeLoanSelected(e.target.checked)}
								type='radio'
								name='type'
								defaultValue={BUDGET_TYPES.loan}
								className='border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50'
								required
							/>
							<span className='ml-2 text-gray-700 text-sm sm:text-base'>
								Loan (installments tracker)
							</span>
						</label>
					</Stack>
				</div>
				<div className='block'>
					<span className='text-gray-700 text-sm sm:text-base'>
						Card background color
					</span>
					<Stack extraClass='mt-1 gap-2 flex-wrap' direction='horizontal'>
						{budgetCardBgColorsToMap.map((color, index) => (
							<label
								key={color}
								className={classNames(
									'inline-flex justify-center items-center py-1 w-10 rounded-md shadow',
									BUDGET_CARD_BG_COLORS[color]
								)}
							>
								<input
									type='radio'
									name='bgColor'
									defaultValue={color}
									className='border-gray-300 text-blue-600 focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50 disabled:text-gray-500'
									defaultChecked={index === 0}
								/>
							</label>
						))}
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
