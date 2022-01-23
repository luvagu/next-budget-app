import Head from 'next/head'

const defaultTile = 'Budgets & Expenses'

function Metatags({ title }) {
	return (
		<Head>
			<title>{title ? `${title} | ${defaultTile}` : defaultTile}</title>
			<meta
				name='description'
				content='Budgets &amp; Expenses app built with Next.js, Auth0, FaunaDb and Tailwind CSS'
			/>
			<meta name='author' content='@luvagu' />
			<meta charSet='UTF-8' />
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1.0, shrink-to-fit=no'
			/>
		</Head>
	)
}

export default Metatags
