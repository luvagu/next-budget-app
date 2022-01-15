import { classNames } from '../../utils/helpers'

function Stack({ children, direction = 'vertical', extraClass }) {
	return (
		<div
			className={classNames(
				'flex self-stretch',
				direction === 'vertical'
					? 'flex-auto flex-col '
					: 'flex-row items-center',
				extraClass
			)}
		>
			{children}
		</div>
	)
}

export default Stack
