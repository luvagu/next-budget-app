import { calculatePercent, classNames } from '../../utils/helpers'

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

function ProgressBar({ current, min = 0, max, isBudgetTypeLoan }) {
	const percent = calculatePercent(current, max)

	return (
		<div className='h-4 bg-gray-300 rounded-lg shadow-inner overflow-hidden transition'>
			<div
				className={classNames(
					'h-4',
					getVariant({ percent, isBudgetTypeLoan }),
					'transition-[width] duration-500'
				)}
				style={{ width: `${percent}%` }}
			></div>
		</div>
	)
}

export default ProgressBar
