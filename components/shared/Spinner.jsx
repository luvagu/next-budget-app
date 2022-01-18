function Spinner() {
	return (
		<div className='bg-gray-50'>
			<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col gap-6 items-center justify-center lg:flex-row'>
				<svg
					className='animate-spin h-7 w-7 sm:h-8 sm:w-8 text-blue-600'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
				>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'
					></circle>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
					></path>
				</svg>
				<h2 className='text-3xl font-extrabold tracking-tight text-gray-600 sm:text-4xl animate-pulse'>
					Please wait...
				</h2>
			</div>
		</div>
	)
}

export default Spinner
