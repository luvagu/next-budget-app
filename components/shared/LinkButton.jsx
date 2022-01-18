import { classNames } from '../../utils/helpers'

const variants = {
	'blue-outline':
		'border-blue-600 text-blue-600 hover:text-white hover:bg-blue-700 focus:ring-blue-500',
	'gray-outline':
		'border-gray-600 text-gray-600 hover:text-white hover:bg-gray-700 focus:ring-gray-500',
}

const sizes = {
	sm: 'py-1 px-1 sm:py-1 sm:px-2 text-xs',
	md: 'py-1 px-2 sm:py-2 sm:px-4 text-sm',
	lg: 'py-2 px-4 sm:py-3 sm:px-6 text-base',
}

function LinkButton({ children, href, variant = 'blue-outline', size = 'md' }) {
	return (
		<a
			className={classNames(
				sizes[size],
				'flex items-center gap-2 border shadow-sm font-semibold whitespace-nowrap rounded-md',
				variants[variant],
				'focus:outline-none focus:ring-2 focus:ring-offset-2'
			)}
			href={href}
		>
			{children}
		</a>
	)
}

export default LinkButton
