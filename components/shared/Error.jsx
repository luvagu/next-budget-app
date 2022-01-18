import HeroContainer from './HeroContainer'
import { ExclamationIcon } from '@heroicons/react/outline'

function Error() {
	return (
		<HeroContainer>
			<ExclamationIcon className='h-7 w-7 sm:h-8 sm:w-8 text-red-600' />
			<h2 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-600'>
				<div>An error has occurred!</div>
				<div className='font-normal text-xl sm:text-2xl'>
					Please try reloading the page.
				</div>
			</h2>
		</HeroContainer>
	)
}

export default Error
