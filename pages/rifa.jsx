import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Modal } from '@/components/shared'

const plans = new Array(100).fill('').map((_, i) => ({
	key: `${i + 1}`,
	name: `${i + 1}`,
	disabled: i % 3.5 === 0,
}))

function CheckIcon(props) {
	return (
		<svg viewBox='0 0 24 24' fill='none' {...props}>
			<circle cx={12} cy={12} r={12} fill='#fff' opacity='0.2' />
			<path
				d='M7 13l3 3 7-7'
				stroke='#fff'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

console.log('@@ plans', plans)

export default function Example() {
	const [selected, setSelected] = useState(plans[0])
	const [isOpen, setIsOpen] = useState(false)

	const closeModal = () => setIsOpen(false)

	const openModal = () => setIsOpen(true)

	console.log('@@ selected', selected)
	console.log('@@ isOpen', isOpen)

	return (
		<>
			<div className='min-h-screen bg-gradient-to-r from-sky-400 to-blue-500'>
				<div className='container mx-auto p-5 flex flex-col gap-5'>
					<RadioGroup value={selected} onChange={setSelected}>
						<div className='grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4'>
							{plans.map(plan => (
								<RadioGroup.Option
									key={plan.key}
									value={plan}
									disabled={plan.disabled}
									onClick={openModal}
									className='ui-active:ring-2 ui-active:ring-white/60 ui-active:ring-offset-2 ui-active:ring-offset-indigo-300 ui-checked:bg-green-900/75 ui-checked:text-white ui-not-checked:ui-not-disabled:bg-white
               ui-disabled:bg-red-900/75 justify-center ui-not-disabled:cursor-pointer ui-disabled:cursor-not-allowed relative flex rounded-lg px-4 py-3 shadow-md focus:outline-none'
								>
									<RadioGroup.Label
										as='p'
										className='text-base font-bold ui-checked:text-yellow-400 ui-not-checked:ui-not-disabled:text-gray-900 ui-disabled:text-gray-300/75'
									>
										{plan.name}
									</RadioGroup.Label>
								</RadioGroup.Option>
							))}
						</div>
					</RadioGroup>
				</div>
			</div>
			<Modal isOpen={isOpen} closeModal={closeModal} />
		</>
	)
}
