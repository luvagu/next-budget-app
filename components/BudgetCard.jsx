import { curencyFormatter } from '../utils/helpers'
import Card from './shared/Card'
import ProgressBar from './shared/ProgressBar'
import Stack from './shared/Stack'

function BudgetCard({ name, amount, max }) {
	return (
		<Card>
			<h2 className='flex justify-between items-baseline text-gray-500 font-semibold text-xl whitespace-nowrap mb-3'>
				<div className='mr-2'>{name}</div>
				<div className='flex items-baseline'>
					{curencyFormatter(amount)}
					<span className='text-base text-gray-400 ml-1'>
						/ {curencyFormatter(max)}
					</span>
				</div>
			</h2>
			<ProgressBar current={amount} max={max} />
			<Stack direction='horizontal'></Stack>
		</Card>
	)
}

export default BudgetCard
