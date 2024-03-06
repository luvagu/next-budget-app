import Header from '@/components/Header'
import Hero from '@/components/Hero'
import { Container, Metatags } from '@/components/shared'
import { getSession } from '@auth0/nextjs-auth0'

export default function Home() {
	return (
		<Container>
			<Metatags />
			<Header isHome />
			<Hero />
		</Container>
	)
}

export async function getServerSideProps(context) {
	const user = getSession(context.req, context.res)

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
