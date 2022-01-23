import { classNames } from '../../utils/helpers'

function HeroContainer({ children, error }) {
	return (
		<div
			className={classNames(
				error ? 'bg-red-50' : 'bg-gray-50',
				'shadow-sm rounded-md'
			)}
		>
			<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col gap-2 sm:gap-4 lg:gap-6 items-center justify-center lg:flex-row'>
				{children}
			</div>
		</div>
	)
}

export default HeroContainer
