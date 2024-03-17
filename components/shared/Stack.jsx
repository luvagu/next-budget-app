import { classNames } from '@/utils/helpers'

function Stack({ children, direction = 'vertical', className }) {
	return (
		<div
			className={classNames(
				'flex self-stretch',
				direction === 'vertical'
					? 'flex-auto flex-col '
					: 'flex-row items-center',
				className
			)}
		>
			{children}
		</div>
	)
}

export default Stack
