import HeroContainer from './HeroContainer'
import { ExclamationIcon } from '@heroicons/react/outline'

function Error() {
	return (
		<HeroContainer error>
			<ExclamationIcon className='h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-red-600' />
			<h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-600 text-center lg:text-left'>
				<div>An error has occurred!</div>
				<div className='font-normal text-xl sm:text-2xl'>
					Please try reloading the page.
				</div>
			</h2>
		</HeroContainer>
	)
}

export default Error
