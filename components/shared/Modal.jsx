import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

function Modal({ children, title, isOpen = false, closeModal }) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='fixed inset-0 z-10 overflow-y-auto'
				onClose={closeModal}
			>
				<div className='min-h-screen px-4 text-center'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className='inline-block h-screen align-middle'
						aria-hidden='true'
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<div className='relative inline-block w-full max-w-md p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
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
								className='text-xl font-semibold leading-6 p-6 text-gray-900 border-b'
							>
								{title}
							</Dialog.Title>

							{/* body */}
							<div className='m-0 p-6'>{children}</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}

export default Modal
