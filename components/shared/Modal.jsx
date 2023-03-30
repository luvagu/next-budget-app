import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

function Modal({ children, title, isOpen = false, closeModal, progress }) {
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
					<div className='fixed inset-0 bg-black/30 backdrop-filter backdrop-blur-[2px]' />
				</Transition.Child>

				<div className='fixed inset-0 h-screen w-screen cursor-auto flex flex-col p-4 sm:p-[10vh]'>
					<div className='w-full flex flex-col min-h-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='relative flex flex-col mx-auto h-full w-full max-w-xl transform rounded-lg bg-white text-left transition-all'>
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
									className='relative flex items-baseline gap-2 text-base sm:text-lg md:text-xl font-semibold leading-6 p-4 pr-12 text-gray-900 border-b'
								>
									{title}
								</Dialog.Title>

								{progress && (
									<div className='relative px-4 py-2 bg-slate-100'>
										{progress}
									</div>
								)}
								{/* body */}
								<div className='m-0 px-4 pt-2 pb-4 overflow-y-auto flex-auto bg-slate-200 shadow-inner'>
									{children}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default Modal
