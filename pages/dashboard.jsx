import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useBadgets } from '../context/BudgetsContext'
import BudgetCard from '../components/BudgetCard'
import CardsGrid from '../components/CardsGrid'
import Header from '../components/Header'
import Container from '../components/shared/Container'
import Metatags from '../components/shared/Metatags'
import Spinner from '../components/shared/Spinner'
import Error from '../components/shared/Error'
import TotalBudgetCard from '../components/TotalBudgetCard'
import UncategorizedBudgetCard from '../components/UncategorizedBudgetCard'
import HeroDashboard from '../components/HeroDashboard'

export default withPageAuthRequired(function Dashboard() {
	const { isFetching, isError, budgets, expenses, getBudgetExpenses } =
		useBadgets()

	const hasBudgets = !!budgets?.length
	const hasExpenses = !!expenses?.length

	return (
		<Container>
			<Metatags title='Dashboard' />
			<Header isDashboard />
			{isFetching && <Spinner />}
			{isError && <Error />}
			{!isFetching && !isError && (hasBudgets || hasExpenses) && (
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

			{!isFetching && !isError && !hasBudgets && !hasExpenses && (
				<HeroDashboard />
			)}
		</Container>
	)
})
