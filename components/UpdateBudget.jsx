import {
	defaultBudgetCardBgColors,
	BUDGET_CARD_BG_COLORS,
	useBadgets,
	BUDGET_TYPES,
} from '@/context/BudgetsContext'
import { capitalizeWords, classNames, twoDigitsNumber } from '@/utils/helpers'
import { Button, Modal, Stack } from '@/components/shared'

function UpdateBudget({ isOpen, closeModal }) {
	const { defaultBudget, updateBudget, isBudgetTypeLoan } = useBadgets()

	const {
		id: ref,
		name: budgetName,
		max: budgetMax,
		bgColor: bgC,
	} = defaultBudget

	const handleSubmit = form => {
		form.preventDefault()

		const { name, max, bgColor } = Object.fromEntries(
			new FormData(form.target).entries()
		)

		updateBudget({
			name: capitalizeWords(name),
			max: twoDigitsNumber(parseFloat(max)),
			bgColor,
			ref,
		})
		closeModal()
	}

	const budgetCardBgColorsToMap = isBudgetTypeLoan
		? [BUDGET_TYPES.loan]
		: defaultBudgetCardBgColors

	return (
		<Modal title='Update Budget' isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
				<label className='block'>
					<span className='text-gray-700'>Name</span>
					<input
						type='text'
						name='name'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
						defaultValue={budgetName}
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
						defaultValue={budgetMax}
						placeholder=''
						required
					/>
				</label>
				<div className='block'>
					<span className='text-gray-700 text-sm sm:text-base'>
						Card background color
					</span>
					<Stack className='mt-1 gap-2 flex-wrap' direction='horizontal'>
						{budgetCardBgColorsToMap.map(color => (
							<label
								key={color}
								className={classNames(
									'inline-flex justify-center items-center py-1 w-10 rounded-md shadow hover:cursor-pointer',
									BUDGET_CARD_BG_COLORS[color]
								)}
							>
								<input
									type='radio'
									name='bgColor'
									defaultValue={color}
									className='border-gray-300 text-blue-600 focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50 disabled:text-gray-500 hover:cursor-pointer'
									defaultChecked={color === bgC}
								/>
							</label>
						))}
					</Stack>
				</div>
				<div className='flex justify-end mt-1'>
					<Button type='submit'>Update</Button>
				</div>
			</form>
		</Modal>
	)
}

export default UpdateBudget
