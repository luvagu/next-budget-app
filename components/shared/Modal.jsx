import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

function Modal({ children, title, isOpen = false, closeModal }) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
								{/* close buttton */}
								<div className='z-20 absolute top-0 right-0 pt-4 pr-3 flex'>
									<button
										type='button'
										className='text-gray-500 hover:text-gray-700 focus:outline-none'
										onClick={closeModal}
									>
										<span className='sr-only'>Close panel</span>
										<XIcon className='h-6 w-6' aria-hidden='true' />
									</button>
								</div>

								<Dialog.Title
									as='h3'
									className='flex items-baseline gap-2 text-xl font-semibold leading-6 p-4 pr-12 text-gray-900 border-b'
								>
									{title}
								</Dialog.Title>

								{/* body */}
								<div className='m-0 p-6'>{children}</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default Modal
