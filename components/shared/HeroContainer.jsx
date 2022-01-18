function HeroContainer({ children }) {
	return (
		<div className='bg-gray-50 shadow-sm rounded-md'>
			<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col gap-6 items-center justify-center lg:flex-row'>
				{children}
			</div>
		</div>
	)
}

export default HeroContainer
