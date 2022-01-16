import { CashIcon } from '@heroicons/react/outline'

function Hero() {
	return (
		<div className='bg-gray-50'>
			<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col gap-6 items-center justify-center lg:flex-row'>
				<CashIcon className='h-14 w-14 sm:h-16 sm:w-16 text-blue-600' />
				<h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
					<span className='block'>Ready to manage budgets?</span>
					<span className='block text-blue-600'>
						Please Login to get started.
					</span>
				</h2>
			</div>
		</div>
	)
}

export default Hero
