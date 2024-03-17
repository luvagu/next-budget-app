import { classNames } from '@/utils/helpers'

const variants = {
	'blue-outline':
		'border-blue-500 text-blue-600 hover:text-white hover:bg-blue-500 focus:ring-blue-500',
	blue: 'border-transparent text-white bg-blue-600 hover:bg-blue-800 focus:ring-blue-600',
	'gray-outline':
		'border-gray-500 text-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-500',
	'indigo-outline':
		'border-indigo-500 text-indigo-500 hover:text-white hover:bg-indigo-600 focus:ring-indigo-500',
	gray: 'border-transparent text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-500',
	'red-outline':
		'border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-500',
	red: 'border-transparent text-white bg-red-500 hover:bg-red-600 focus:ring-red-500',
}

const sizes = {
	sm: 'gap-1 py-1 px-1 sm:py-1 sm:px-2 text-xs',
	md: 'gap-1 sm:gap-2 py-1 px-2 sm:py-2 sm:px-4 text-xs sm:text-sm',
	lg: 'gap-3 py-2 px-4 sm:py-3 sm:px-6 text-base',
}

function Button({
	children,
	type = 'button',
	variant = 'blue',
	size = 'md',
	onClick,
	disabled = false,
	className,
}) {
	return (
		<button
			type={type}
			className={classNames(
				sizes[size],
				'inline-flex items-center border shadow-sm font-semibold whitespace-nowrap rounded focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed',
				variants[variant],
				className
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button
