import { curencyFormatter } from '../utils/helpers'
import Card from './shared/Card'
import Stack from './shared/Stack'

function BudgetCard({ name, amount, max }) {
	return (
		<Card>
			<h2>
				<span>{name}</span>
				<span>
					{curencyFormatter(amount)} / {curencyFormatter(max)}
				</span>
			</h2>
			<Stack direction='horizontal'></Stack>
		</Card>
	)
}

export default BudgetCard
