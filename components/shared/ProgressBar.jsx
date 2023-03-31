import {
	calculatePercent,
	classNames,
	curencyFormatter,
} from '../../utils/helpers'

const getVariant = ({ percent, isBudgetTypeLoan }) => {
	const variants = {
		blue: 'bg-blue-500',
		green: 'bg-green-500',
		red: 'bg-red-500',
		yellow: 'bg-yellow-500',
	}

	if (percent < 25) return isBudgetTypeLoan ? variants.red : variants.green
	if (percent < 50) return isBudgetTypeLoan ? variants.yellow : variants.blue
	if (percent < 75) return isBudgetTypeLoan ? variants.blue : variants.yellow

	return isBudgetTypeLoan ? variants.green : variants.red
}

function ProgressBar({
	current,
	min = 0,
	max,
	isBudgetTypeLoan,
	isInModal,
	isTotal,
}) {
	const percent = calculatePercent(current, max)
	const isOver = current > max
	const isAtMax = current === max
	const remaining = max - current

	return (
		<>
			{!isInModal &&
				(isBudgetTypeLoan ? (
					<p className='text-xs mb-1'>
						{isAtMax
							? 'Congratulation! The loan is paid in full.'
							: isOver
							? `You've overpaid the loan by ${curencyFormatter(remaining)}`
							: `You're ${curencyFormatter(
									remaining
							  )} away from repaying the loan.`}
					</p>
				) : (
					<p className='text-xs mb-1'>
						{isAtMax
							? isTotal
								? 'Your total budget is maxed out!'
								: "You've maxed out the badget."
							: isOver
							? isTotal
								? `Opps! You've gone over the total badget by ${curencyFormatter(
										remaining
								  )}`
								: `Opps! You've gone over the badget by ${curencyFormatter(
										remaining
								  )}`
							: isTotal
							? `You're ${curencyFormatter(
									remaining
							  )} away from maxing out the total budget.`
							: `You're ${curencyFormatter(
									remaining
							  )} away from maxing out the budget.`}
					</p>
				))}
			<div
				className={classNames(
					isInModal ? 'relative h-5' : 'h-4',
					'w-full bg-gray-300 rounded-lg shadow-inner overflow-hidden transition'
				)}
			>
				<div
					className={classNames(
						isInModal ? 'h-5' : 'h-4',
						getVariant({ percent, isBudgetTypeLoan }),
						'transition-[width] duration-500'
					)}
					style={{ width: `${percent}%` }}
				/>
				{isInModal && (
					<div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs sm:text-sm text-black font-medium'>
						{curencyFormatter(current)} / {curencyFormatter(max)}
					</div>
				)}
			</div>
		</>
	)
}

export default ProgressBar
