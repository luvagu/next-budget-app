function CardsGrid({ children }) {
	return (
		<div className='grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 items-start'>
			{children}
		</div>
	)
}

export default CardsGrid
