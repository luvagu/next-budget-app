import { useState } from 'react'
import { RadioGroup, Switch } from '@headlessui/react'
import { Button, Metatags, Modal, Stack } from '@/components/shared'
import { Tooltip } from 'react-tooltip'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { capitalizeWords, classNames, getUserFirstName } from '@/utils/helpers'
import axios from 'axios'
import useSWR from 'swr'

const getRaffle100 = (reservedSlots = []) => {
	const RAFFLE_100 = Array.from(new Array(100).keys()).map(key => ({
		key: `${key + 1}`,
		value: `${key + 1}`,
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

function useRaffleData({ revalidateOnFocus = true }) {
	const { data, error, mutate } = useSWR(
		'/api/raffledb/read/raffle0324',
		fetcher,
		{ revalidateOnFocus }
	)

	return {
		raffle100: getRaffle100(data),
		isFetching: !data && !error,
		isError: error,
		mutate,
	}
}

const saveReservation = async payload => {
	return await axios.post('/api/raffledb/create/raffle0324', payload)
}

const Toggle = ({ enabled, setEnabled }) => {
	return (
		<Stack direction='horizontal' className='gap-4 text-sm font-medium'>
			<span>Selección:</span>
			<span>Individual</span>
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={classNames(
					enabled ? 'bg-green-900/75' : 'bg-blue-900/75',
					'relative inline-flex h-[20px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
				)}
			>
				<span
					aria-hidden='true'
					className={classNames(
						enabled ? 'translate-x-9 bg-yellow-400' : 'translate-x-0 bg-white',
						'pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full  shadow-lg ring-0 transition duration-200 ease-in-out'
					)}
				/>
			</Switch>
			<span>Múltiple</span>
		</Stack>
	)
}

const ConfirmChoices = ({ choices, isVisble, setConfirm }) => {
	const disabled = !choices.length

	return isVisble ? (
		<div className='max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-10 max-sm:shadow-xl max-sm:flex max-sm:justify-center max-sm:bg-slate-200 max-sm:p-2'>
			<Button
				disabled={disabled}
				size='sm'
				onClick={setConfirm}
				className='max-sm:w-full max-sm:justify-center'
			>
				Confirmar
			</Button>
		</div>
	) : null
}

export default function Rifa() {
	// Set global Axios required Authorization headers for all api calls
	axios.defaults.headers.common['Authorization'] = 'Raffle0324'

	const [selected, setSelected] = useState({})
	const [isOpen, setIsOpen] = useState(false)
	const [isFormSubmited, setIsFormSubmited] = useState(false)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isMultiSelect, setIsMultiSelect] = useState(false)
	const [choices, setChoices] = useState([])

	const { raffle100, mutate } = useRaffleData({
		revalidateOnFocus: !isMultiSelect,
	})

	const closeModal = () => {
		setIsOpen(false)

		// Modal closes with 200ms due to transition delay
		// Calling setters after modal is not visible
		setTimeout(() => {
			!isMultiSelect && setCheckedSlot(selected, false)
			isFormSubmited && isMultiSelect && setChoices([])
			isFormSubmited && isMultiSelect && setIsMultiSelect(false)
			setSelected({})
			setIsFormSubmited(false)
			setError('')
		}, 200)
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

		const isValueSelected = !!(isMultiSelect ? choices.length : selected.value)

		if (!name || !phone || !payment || !isValueSelected) {
			return setError('Todos los campos son requeridos')
		}

		const getData = value => ({
			disabled: true,
			value,
			user: capitalizeWords(name),
			phone,
			payment,
		})

		const payload = isMultiSelect
			? choices.map(choice => getData(choice.value))
			: getData(selected.value)

		setIsLoading(true)
		saveReservation(payload)
			.then(() => mutate().finally(() => setIsFormSubmited(true)))
			.catch(() =>
				setError(
					'Un error ha ocurrido al procesar la operación. Por favor inténtalo nuevamente o elige otro número.'
				)
			)
			.finally(() => setIsLoading(false))
	}

	const handleMultipleSelect = () => {
		setIsMultiSelect(!isMultiSelect)

		if (isMultiSelect) {
			resetChoices()
		}
	}

	const resetChoices = () => {
		// set checked slot to false
		mutate(
			raffle100.map(slot => {
				if (choices.findIndex(choice => choice.value === slot.value) !== -1) {
					return { ...slot, checked: false }
				}
				return slot
			}),
			false // importsnt do not revalidate as we don't save this state on DB
		).finally(() => setChoices([]))
	}

	const setCheckedSlot = (selected, checked = true) => {
		// set checked slot (true or false)
		mutate(
			raffle100.map(slot => ({
				...slot,
				...(slot.value === selected.value && { checked }),
			})),
			false // important do not revalidate as we don't save this state on DB
		)
	}

	const handleSetChoice = selected => {
		setSelected(selected)
		setCheckedSlot(selected)

		if (isMultiSelect) {
			setChoices(prevChoices => {
				const isAlreadySelected = prevChoices.find(
					({ value }) => value === selected.value
				)

				isAlreadySelected && setCheckedSlot(selected, false)

				return isAlreadySelected
					? prevChoices.filter(({ value }) => value !== selected.value)
					: [...prevChoices, selected]
			})
		}
	}

	const isMultipleChoices = isMultiSelect && choices.length > 1
	const numbers = isMultiSelect
		? choices.map(({ value }) => value).join(', ')
		: selected.value
	const dolarAmount = `$${isMultiSelect ? choices.length : '1'}`
	const bolivarAmount = `Bs. ${isMultiSelect ? choices.length * 40 : '40'}`

	return (
		<>
			<Metatags
				title='Gana $50 🤑 | Gran Rifa'
				description='Participa y gana $50 dolarotes. Separa tu número hoy por tan solo $1 dolar.'
				noDefaultTitle
			/>
			<div className='min-h-screen bg-gradient-to-r from-sky-400 to-blue-500'>
				<Stack
					className={classNames(
						'container mx-auto p-5 gap-4',
						isMultiSelect && 'pb-16 sm:pb-0'
					)}
				>
					<h1 className='text-xl font-bold'>
						Gran Rifa Marzo 2024 - El gordito cincuentón - Gana $50 🤑
					</h1>
					<h3 className='text-sm font-medium'>
						Participa y gana $50 dolarotes. Separa tu número hoy por tan solo $1
						dolar (Bs. 40). <br />
						<strong>Ojo 👀</strong>: sorteo a realizarse con 75% de venta
						<br />
						<strong>Tip 💡</strong>: los números en blanco aún están
						disponibles.
					</h3>
					<Stack className='gap-4 min-h-[26px]' direction='horizontal'>
						<Toggle enabled={isMultiSelect} setEnabled={handleMultipleSelect} />
						<ConfirmChoices
							choices={choices}
							setConfirm={openModal}
							isVisble={isMultiSelect}
						/>
					</Stack>
					<RadioGroup value={selected} onChange={handleSetChoice}>
						<div className='grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-4'>
							{raffle100.map(slot => (
								<RadioGroup.Option
									key={slot.key}
									value={slot}
									disabled={slot.disabled}
									onClick={!isMultiSelect && openModal}
									className={classNames(
										slot.checked
											? 'bg-green-900/75 text-white '
											: 'ui-not-checked:ui-not-disabled:bg-white',
										'ui-active:ring-2 ui-active:ring-white/60 ui-active:ring-offset-2 ui-active:ring-offset-indigo-300 ui-disabled:bg-red-900/75 ui-not-disabled:cursor-pointer ui-disabled:cursor-not-allowed relative flex justify-center rounded-md p-3 shadow-md focus:outline-none'
									)}
									{...(slot.user && {
										'data-tooltip-id': 'user-first-name',
										'data-tooltip-content': getUserFirstName(slot.user),
									})}
								>
									<RadioGroup.Label
										as='p'
										className={classNames(
											slot.checked
												? 'text-yellow-400'
												: 'ui-not-checked:ui-not-disabled:text-gray-900',
											'text-sm font-bold ui-disabled:text-gray-300/75'
										)}
									>
										{slot.value}
									</RadioGroup.Label>
								</RadioGroup.Option>
							))}
						</div>
					</RadioGroup>
				</Stack>
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
							Has seleccionado {isMultipleChoices ? 'los números' : 'el número'}{' '}
							<strong>{numbers}</strong>
							.
							<br />
							El total a pagar es <strong>{dolarAmount}</strong> o{' '}
							<strong>{bolivarAmount}</strong>
							<br />
							Llena todos los datos a continuación para confirmar tu reserva.
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
							<Stack className='mt-1'>
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
					<Stack className='gap-4'>
						<CheckCircleIcon className='h-10 w-10 mx-auto text-green-500' />
						<p>
							{isMultipleChoices ? 'Tus números' : 'Tu número'}{' '}
							<span className='font-bold'>{numbers}</span>{' '}
							{isMultipleChoices ? 'fueron reservados' : 'fue reservado'} con
							éxito. En breve serás contactado para confirmar el pago.
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

Rifa.displayName = 'rifa.home'

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
