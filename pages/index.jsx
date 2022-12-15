import { getSession } from '@auth0/nextjs-auth0'
import Container from '../components/shared/Container'
import Metatags from '../components/shared/Metatags'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Error from '../components/shared/Error'

export default function Home() {
	return (
		<Container>
			<Metatags />
			<Header isHome />
			<Hero />
		</Container>
	)
}

export const getServerSideProps = async context => {
	const user = await getSession(context.req, context.res)

	if (user) {
		return {
			redirect: {
				destination: '/dashboard',
				permanent: false,
			},
		}
	}

	return {
		props: {},
	}
}
