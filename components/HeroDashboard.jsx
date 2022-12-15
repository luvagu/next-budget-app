import { ShieldExclamationIcon } from '@heroicons/react/outline'
import HeroContainer from './shared/HeroContainer'

function HeroDashboard() {
	return (
		<HeroContainer>
			<ShieldExclamationIcon className='h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-yellow-600' />
			<h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 text-center lg:text-left'>
				<div>Ooops!</div>
				<div className='text-gray-600 text-xl sm:text-2xl'>
					You don&apos;t have any budgets yet.
				</div>
				<div className='text-blue-600 text-xl sm:text-2xl'>
					Add a Budget or Expense to get started!
				</div>
			</h2>
		</HeroContainer>
	)
}

export default HeroDashboard
