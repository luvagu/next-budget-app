import { classNames } from '../../utils/helpers'

const variants = {
	'blue-outline':
		'border-blue-600 text-blue-600 hover:text-white hover:bg-blue-700 focus:ring-blue-500',
	blue: 'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
	'gray-outline':
		'border-gray-500 text-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-400',
	gray: 'border-transparent text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-400',
}

function Button({
	children,
	type = 'button',
	variant = 'blue',
	onClick,
	extraClass,
}) {
	return (
		<button
			type={type}
			className={classNames(
				'py-2 px-4 border shadow-sm text-sm font-semibold whitespace-nowrap rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
				variants[variant],
				extraClass
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
