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
import Error from '../components/shared/Error'
import Head from 'next/head'

export default function Home() {
	const { user } = useUser()
	const { isFetching, isError, budgets, getBudgetExpenses } = useBadgets()

	return (
		<Container>
			<Head>
				<title>Budgets &amp; Expenses</title>
				<meta
					name='description'
					content='Budgets and Expenses app built with Next.js, Auth0, FaunaDb and Tailwind CSS'
				/>
				<meta name='author' content='@luvagu' />
				<meta charSet='UTF-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, shrink-to-fit=no'
				/>
			</Head>
			<Header />
			{!user && <Hero />}
			{user && isFetching && <Spinner />}
			{user && isError && <Error />}
			{user && !isFetching && !isError && (
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
		</Container>
	)
}
