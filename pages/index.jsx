import Container from '../components/shared/Container'
import CardsGrid from '../components/CardsGrid'
import Header from '../components/Header'
import BudgetCard from '../components/BudgetCard'
import { useBadgets } from '../context/BudgetsContext'
import AddBudget from '../components/AddBudget'
import UncategorizedBudgetCard from '../components/UncategorizedBudgetCard'
import TotalBudgetCard from '../components/TotalBudgetCard'

export default function Home() {
	const {
		budgets,
		expenses,
		getBudgetExpenses,
		addExpense,
		addBudget,
		deleteBudget,
		deleteExpense,
	} = useBadgets()

	return (
		<Container>
			<Header />
			<CardsGrid>
				{budgets.map(({ id, name, max }) => {
					const amount = getBudgetExpenses(id).reduce(
						(total, expense) => total + expense.amount,
						0
					)
					return (
						<BudgetCard
							key={id}
							id={id}
							name={name}
							amount={amount}
							max={max}
						/>
					)
				})}
				<UncategorizedBudgetCard />
				<TotalBudgetCard />
			</CardsGrid>
		</Container>
	)
}
