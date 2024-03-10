import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { Container, Metatags } from '@/components/shared'
import { getSession } from '@auth0/nextjs-auth0'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
	return (
		<Container>
			<Metatags />
			<Navbar isHome />
			<Hero />
		</Container>
	)
}

export async function getServerSideProps(context) {
	const { locale, req, res } = context
	const user = getSession(req, res)

	if (user) {
		return {
			redirect: {
				destination: '/dashboard',
				permanent: false,
			},
		}
	}

	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	}
}
