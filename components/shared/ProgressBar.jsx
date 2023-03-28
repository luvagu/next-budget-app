import { BUDGET_TYPE_INSTALLMENTS } from '../../context/BudgetsContext'
import { calculatePercent, classNames } from '../../utils/helpers'

const variants = {
	blue: 'bg-blue-500',
	green: 'bg-green-500',
	red: 'bg-red-500',
	yellow: 'bg-yellow-500',
}

function ProgressBar({ current, min = 0, max, type }) {
	const isInstallments = type === BUDGET_TYPE_INSTALLMENTS

	const getVariant = () => {
		const percent = calculatePercent(current, max)

		if (percent < 25) return isInstallments ? variants.red : variants.green
		if (percent < 50) return isInstallments ? variants.yellow : variants.blue
		if (percent < 75) return isInstallments ? variants.blue : variants.yellow

		return isInstallments ? variants.green : variants.red
	}

	return (
		<div className='h-4 bg-gray-300 rounded-lg overflow-hidden transition'>
			<div
				className={classNames(
					'h-4',
					getVariant(),
					'transition-[width] duration-500'
				)}
				style={{ width: `${calculatePercent(current, max)}%` }}
			></div>
		</div>
	)
}

export default ProgressBar
