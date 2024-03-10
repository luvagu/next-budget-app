import { classNames } from '@/utils/helpers'

function Card({ children, bgColor = 'bg-white' }) {
	return (
		<div
			className={classNames(
				'py-4 px-4 w-auto sm:h-full border rounded-md shadow',
				bgColor
			)}
		>
			{children}
		</div>
	)
}

export default Card
