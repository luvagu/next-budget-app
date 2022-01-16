import BudgetsProvider from '../context/BudgetsContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<BudgetsProvider>
			<Component {...pageProps} />
		</BudgetsProvider>
	)
}

export default MyApp
