import { useUser } from '@auth0/nextjs-auth0'
import Container from '../components/shared/Container'
import CardsGrid from '../components/CardsGrid'
import Header from '../components/Header'
import BudgetCard from '../components/BudgetCard'
import { useBadgets } from '../context/BudgetsContext'
import UncategorizedBudgetCard from '../components/UncategorizedBudgetCard'
import TotalBudgetCard from '../components/TotalBudgetCard'
import Hero from '../components/Hero'
import Spinner from '../components/shared/Spinner'

export default function Home() {
	const { user } = useUser()
	const { loading, budgets, getBudgetExpenses } = useBadgets()

	return (
		<Container>
			<Header />
			{user && loading ? (
				<Spinner />
			) : (
				<CardsGrid>
					{budgets?.map(({ id, name, max }) => {
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
			)}
			{!user && <Hero />}
		</Container>
	)
}
