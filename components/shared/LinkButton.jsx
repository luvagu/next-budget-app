import { classNames } from '../../utils/helpers'

const variants = {
	'blue-outline':
		'border-blue-600 text-blue-600 hover:text-white hover:bg-blue-700 focus:ring-blue-500',
	'gray-outline':
		'border-gray-600 text-gray-600 hover:text-white hover:bg-gray-700 focus:ring-gray-500',
}

function LinkButton({ children, href, variant = 'blue-outline' }) {
	return (
		<a
			className={classNames(
				'flex items-center gap-2 py-2 px-4 text-sm border shadow-sm font-semibold whitespace-nowrap rounded-md',
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
