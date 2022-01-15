import { classNames } from '../utils/twcss.helpers'

function Button({ type = 'button', variant = 'full', onClick, children }) {
	return (
		<button
			type={type}
			className={classNames(
				'inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md hover:bg-blue-700 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2',
				variant === 'outlined'
					? 'border-blue-600 text-blue-600 hover:text-white'
					: 'border-transparent text-white bg-blue-600'
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
