import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useBadgets } from '@/context/BudgetsContext'
import BudgetCard from '@/components/BudgetCard'
import CardsGrid from '@/components/shared/CardsGrid'
import Header from '@/components/Header'
import TotalBudgetCard from '@/components/TotalBudgetCard'
import UncategorizedBudgetCard from '@/components/UncategorizedBudgetCard'
import HeroDashboard from '@/components/HeroDashboard'
import { Container, Error, Metatags, Spinner } from '@/components/shared'

export default withPageAuthRequired(function Dashboard() {
	const { isFetching, isError, budgets, expenses, getBudgetExpensesAmount } =
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
					{budgets?.map(({ id, ...props }) => {
						const amount = getBudgetExpensesAmount(id)

						return <BudgetCard key={id} id={id} amount={amount} {...props} />
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
