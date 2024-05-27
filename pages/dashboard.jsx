import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useBadgets } from '@/context/BudgetsContext'
import BudgetCard from '@/components/BudgetCard'
import CardsGrid from '@/components/shared/CardsGrid'
import Navbar from '@/components/Navbar'
import TotalBudgetCard from '@/components/TotalBudgetCard'
import UncategorizedBudgetCard from '@/components/UncategorizedBudgetCard'
import HeroDashboard from '@/components/HeroDashboard'
import { Container, Error, Metatags, Spinner } from '@/components/shared'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import TotalLoanCard from '@/components/TotalLoanCard'

export default function Dashboard() {
	const { isFetching, isError, budgets, expenses, getBudgetExpensesAmount } =
		useBadgets()

	const hasBudgets = !!budgets?.length
	const hasExpenses = !!expenses?.length

	const { t } = useTranslation()

	return (
		<Container>
			<Metatags title={t('dashboard_page_title')} />
			<Navbar isDashboard />
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
					<TotalLoanCard />
				</CardsGrid>
			)}

			{!isFetching && !isError && !hasBudgets && !hasExpenses && (
				<HeroDashboard />
			)}
		</Container>
	)
}

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {
		const { locale } = context

		return {
			props: {
				...(await serverSideTranslations(locale, ['common'])),
			},
		}
	},
})
