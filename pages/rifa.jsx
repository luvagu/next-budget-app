import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Button, Metatags, Modal, Stack } from '@/components/shared'
import { Tooltip } from 'react-tooltip'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { capitalizeWords, getUserFirstName } from '@/utils/helpers'
import axios from 'axios'
import useSWR from 'swr'

const getRaffle100 = (reservedSlots = []) => {
	const RAFFLE_100 = new Array(100).fill('').map((_, i) => ({
		key: `${i + 1}`,
		value: `${i + 1}`,
		disabled: false,
	}))

	const raffle_100_updated = RAFFLE_100.map(slot => {
		const reservedSlot = reservedSlots.find(({ value }) => value === slot.value)
		if (reservedSlot) {
			return {
				...slot,
				...reservedSlot,
			}
		}
		return slot
	})

	return raffle_100_updated
}

const fetcher = url => axios.get(url).then(res => res.data)

function useRaffleData() {
	const { data, error, mutate } = useSWR(
		'/api/raffledb/read/raffle0324',
		fetcher
	)

	return {
		raffle100: getRaffle100(data),
		isFetching: !data && !error,
		isError: error,
		mutate,
	}
}

const saveReservation = async data =>
	await axios.post('/api/raffledb/create/raffle0324', data)

export default function Rifa() {
	// Set global Axios required Authorization headers for all api calls
	axios.defaults.headers.common['Authorization'] = 'Raffle0324'

	const { raffle100, mutate } = useRaffleData()

	const [selected, setSelected] = useState({})
	const [isOpen, setIsOpen] = useState(false)
	const [isFormSubmited, setIsFormSubmited] = useState(false)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const closeModal = () => {
		setIsOpen(false)
		setSelected({})
		setIsFormSubmited(false)
		setError('')
	}
	const openModal = () => {
		setIsOpen(true)
	}

	const handleSubmit = form => {
		form.preventDefault()
		setError('')

		const { name, phone, payment } = Object.fromEntries(
			new FormData(form.target).entries()
		)

		if (!name || !phone || !payment || !selected.value) {
			return setError('Todos los campos son requeridos')
		}

		const data = {
			disabled: true,
			value: selected.value,
			user: capitalizeWords(name),
			phone,
			payment,
		}

		setIsLoading(true)
		saveReservation(data)
			.then(() => {
				setIsFormSubmited(true)
				mutate()
			})
			.catch(() =>
				setError(
					'Un error ha ocurrido al procesar la operación. Por favor inténtalo nuevamente o elige otro número.'
				)
			)
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			<Metatags
				title='Gana $50 🤑 | Gran Rifa'
				description='Participa y gana $50 dolarotes. Separa tu número hoy por tan solo $1 dolar.'
				noDefaultTitle
			/>
			<div className='min-h-screen bg-gradient-to-r from-sky-400 to-blue-500'>
				<div className='container mx-auto p-5 flex flex-col gap-5'>
					<RadioGroup value={selected} onChange={setSelected}>
						<Stack extraClass='gap-4'>
							<RadioGroup.Label as='h1' className='text-xl font-bold'>
								Gran Rifa Marzo 2024 - El gordito cincuentón - Gana $50 🤑
							</RadioGroup.Label>
							<RadioGroup.Description as='h3' className='text-sm font-medium'>
								Participa y gana $50 dolarotes. Separa tu número hoy por tan
								solo $1 dolar. <br />
								<strong>Ojo 👀</strong>: sorteo a realizarse con 75% de venta
								<br />
								<strong>Tip 💡</strong>: los números en blanco aún están
								disponibles.
							</RadioGroup.Description>
							<div className='grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4'>
								{raffle100.map(slot => (
									<RadioGroup.Option
										key={slot.key}
										value={slot}
										disabled={slot.disabled}
										onClick={openModal}
										className='ui-active:ring-2 ui-active:ring-white/60 ui-active:ring-offset-2 ui-active:ring-offset-indigo-300 ui-checked:bg-green-900/75 ui-checked:text-white ui-not-checked:ui-not-disabled:bg-white
               ui-disabled:bg-red-900/75 justify-center ui-not-disabled:cursor-pointer ui-disabled:cursor-not-allowed relative flex rounded-lg px-4 py-3 shadow-md focus:outline-none'
										{...(slot.user && {
											'data-tooltip-id': 'user-first-name',
											'data-tooltip-content': getUserFirstName(slot.user),
										})}
									>
										<RadioGroup.Label
											as='p'
											className='text-base font-bold ui-checked:text-yellow-400 ui-not-checked:ui-not-disabled:text-gray-900 ui-disabled:text-gray-300/75'
										>
											{slot.value}
										</RadioGroup.Label>
									</RadioGroup.Option>
								))}
							</div>
						</Stack>
					</RadioGroup>
				</div>
			</div>
			<Tooltip id='user-first-name' place='top' />
			<Modal
				isOpen={isOpen}
				title={isFormSubmited ? '¡Reserva exitosa!' : 'Confirma tu reserva'}
				closeModal={closeModal}
			>
				{!isFormSubmited && (
					<form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
						<p className='text-sm'>
							Has seleccionado el número <strong>{selected.value}</strong>.
							Confirma tu reserva llenando todos los datos a continuación.
						</p>
						<label className='block'>
							<span className='text-gray-700 text-sm sm:text-base'>
								Tu nombre
							</span>
							<input
								type='text'
								name='name'
								className='mt-1 block w-full rounded-md text-sm sm:text-base border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
								placeholder='Ejemplo: Victor Solano'
								required
							/>
						</label>
						<label className='block'>
							<span className='text-gray-700 text-sm sm:text-base'>
								Tu número de WhatsApp
							</span>
							<input
								type='tel'
								name='phone'
								className='mt-1 block w-full rounded-md text-sm sm:text-base border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
								placeholder='Ejemplo +58 424-2296123'
								required
							/>
						</label>
						<div className='block'>
							<span className='text-gray-700 text-sm sm:text-base'>
								Método de pago preferido
							</span>
							<Stack extraClass='mt-1'>
								<label className='inline-flex items-center'>
									<input
										onChange={null}
										type='radio'
										name='payment'
										defaultValue='Pago móvil'
										className='border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50'
										required
									/>
									<span className='ml-2 text-gray-700 text-sm sm:text-base'>
										Pago móvil (se enviaran los datos a tu WhatsApp)
									</span>
								</label>
								<label className='inline-flex items-center'>
									<input
										onChange={null}
										type='radio'
										name='payment'
										defaultValue='Efectivo'
										className='border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50'
										required
									/>
									<span className='ml-2 text-gray-700 text-sm sm:text-base'>
										Efectivo
									</span>
								</label>
							</Stack>
						</div>
						{error && <p className='text-sm text-red-500'>{error}</p>}
						<div className='flex justify-end mt-1'>
							<Button disabled={isLoading} type='submit'>
								{isLoading ? 'Procesando...' : 'Enviar'}
							</Button>
						</div>
					</form>
				)}
				{isFormSubmited && (
					<Stack extraClass='gap-4'>
						<CheckCircleIcon className='h-10 w-10 mx-auto text-green-500' />
						<p>
							Tu número{' '}
							<span className='font-bold underline'>{selected.value}</span> fue
							reservado con éxito. En breve serás contactado para confirmar el
							pago.
						</p>
						<p>
							<span className='text-red-700 font-bold'>Importante</span>: debes
							realizar el pago de tu reserva en un lapso máximo de 24 horas con
							tu método de pago preferido, de lo contrario tu reserva será
							cancelada.
						</p>
						<div className='flex justify-end mt-1'>
							<Button onClick={closeModal}>Aceptar</Button>
						</div>
					</Stack>
				)}
			</Modal>
		</>
	)
}

// export async function getServerSideProps() {
// 	// const { locale } = context
// 	const reservedSlots = await getRaffleSlots_0324()
// 	const raffleData = getRaffle100(reservedSlots)

// 	return {
// 		props: {
// 			raffleData,
// 			// ...(await serverSideTranslations(locale, ['rifa'])),
// 		},
// 	}
// }
