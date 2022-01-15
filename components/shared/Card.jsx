function Card({ children }) {
	return (
		<div className='py-6 px-6 w-auto border bg-white rounded-lg shadow space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
			{children}
		</div>
	)
}

export default Card
