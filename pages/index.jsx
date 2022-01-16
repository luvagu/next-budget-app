import Container from '../components/shared/Container'
import CardsGrid from '../components/CardsGrid'
import Header from '../components/Header'
import BudgetCard from '../components/BudgetCard'

export default function Home() {
	return (
		<Container>
			<Header />
			<CardsGrid>
				<BudgetCard name='Entertainment' amount={749} max={1000} />
			</CardsGrid>
		</Container>
	)
}
