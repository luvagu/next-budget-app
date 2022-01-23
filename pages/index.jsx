import { useUser } from '@auth0/nextjs-auth0'
import Container from '../components/shared/Container'
import Metatags from '../components/shared/Metatags'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Spinner from '../components/shared/Spinner'
import Error from '../components/shared/Error'

export default function Home() {
	const { user, error } = useUser()

	return (
		<Container>
			<Metatags />
			<Header isHome />
			{error && <Error />}
			{user && <Hero user />}
			{!user && !error && <Hero />}
		</Container>
	)
}
