import { classNames } from '../../utils/helpers'

function Card({ children, extraClass }) {
	return (
		<div
			className={classNames(
				'py-4 px-4 w-auto border bg-white rounded-lg shadow',
				extraClass
			)}
		>
			{children}
		</div>
	)
}

export default Card
