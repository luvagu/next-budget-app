import Link from 'next/link'
import { classNames } from '@/utils/helpers'

const variants = {
	'blue-outline':
		'border-blue-600 text-blue-600 hover:text-white hover:bg-blue-700 focus:ring-blue-500',
	'gray-outline':
		'border-gray-600 text-gray-600 hover:text-white hover:bg-gray-700 focus:ring-gray-500',
}

const sizes = {
	sm: 'gap-1 py-1 px-1 sm:py-1 sm:px-2 text-xs',
	md: 'gap-1 sm:gap-2 py-1 px-2 sm:py-2 sm:px-4 text-xs sm:text-sm',
	lg: 'gap-3 py-2 px-4 sm:py-3 sm:px-6 text-base',
}

const LinkButton = ({
	children,
	variant = 'blue-outline',
	size = 'md',
	...props
}) => {
	return (
		<Link
			className={classNames(
				sizes[size],
				'inline-flex items-center border shadow-sm font-semibold whitespace-nowrap rounded-md',
				variants[variant],
				'focus:outline-none focus:ring-2 focus:ring-offset-2'
			)}
			{...props}
		>
			{children}
		</Link>
	)
}

export default LinkButton
