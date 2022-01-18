import HeroContainer from './shared/HeroContainer'
import { CashIcon } from '@heroicons/react/outline'

function Hero() {
	return (
		<HeroContainer>
			<CashIcon className='h-14 w-14 sm:h-16 sm:w-16 text-blue-600' />
			<h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
				<span className='block'>Ready to manage budgets?</span>
				<span className='block text-blue-600'>
					Please Log In to get started.
				</span>
			</h2>
		</HeroContainer>
	)
}

export default Hero
