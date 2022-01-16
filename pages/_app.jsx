import { UserProvider } from '@auth0/nextjs-auth0'
import BudgetsProvider from '../context/BudgetsContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<BudgetsProvider>
				<Component {...pageProps} />
			</BudgetsProvider>
		</UserProvider>
	)
}

export default MyApp
