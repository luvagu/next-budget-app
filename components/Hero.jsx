import { HeroContainer } from '@/components/shared'
import { BanknotesIcon as CashIcon } from '@heroicons/react/24/outline'

function Hero({ user }) {
	return (
		<HeroContainer>
			<CashIcon className='h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-600' />
			<h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 text-center lg:text-left'>
				<div>Ready to manage budgets?</div>
				<div className='text-blue-600 text-xl sm:text-2xl'>
					{user ? 'Visit your dashboard!' : 'Log In to get started.'}
				</div>
			</h2>
		</HeroContainer>
	)
}

export default Hero
