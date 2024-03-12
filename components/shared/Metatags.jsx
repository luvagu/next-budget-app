import Head from 'next/head'
import { useTranslation } from 'next-i18next'

function Metatags({ title, description, noDefaultTitle }) {
	const { t } = useTranslation()
	const defaultTile = t('app_title')

	return (
		<Head>
			<title>
				{noDefaultTitle
					? title
					: title
					? `${title} | ${defaultTile}`
					: defaultTile}
			</title>
			<meta
				name='description'
				content={description ? description : t('meta_description')}
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
