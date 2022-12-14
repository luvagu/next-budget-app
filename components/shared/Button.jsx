import { classNames } from '../../utils/helpers'

const variants = {
	'blue-outline':
		'border-blue-600 text-blue-600 hover:text-white hover:bg-blue-700 focus:ring-blue-500',
	blue: 'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
	'gray-outline':
		'border-gray-500 text-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-400',
	gray: 'border-transparent text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-400',
	'red-outline':
		'border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-400',
	red: 'border-transparent text-white bg-red-500 hover:bg-red-600 focus:ring-red-400',
}

const sizes = {
	sm: 'py-1 px-1 sm:py-1 sm:px-2 text-xs',
	md: 'py-1 px-2 sm:py-2 sm:px-4 text-sm',
	lg: 'py-2 px-4 sm:py-3 sm:px-6 text-base',
}

function Button({
	children,
	type = 'button',
	variant = 'blue',
	size = 'md',
	onClick,
	disabled = false,
	extraClass,
}) {
	return (
		<button
			type={type}
			className={classNames(
				sizes[size],
				'border shadow-sm font-semibold whitespace-nowrap rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed',
				variants[variant],
				extraClass
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button
