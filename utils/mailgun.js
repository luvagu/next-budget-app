import mailgun from 'mailgun-js'

const client = mailgun({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN,
})

export async function mailRaffle0324Notification(data) {
	const { values, user, phone, payment, refs } = data

	try {
		if (!values || !user || !phone || !payment || !refs) {
			throw new Error(`Campos requeridos incompletos!`)
		}

		const valuesLenght = values.length
		const url =
			process.env.NODE_ENV === 'development'
				? `http://localhost:3000`
				: 'https://next-budget-app-three.vercel.app'

		const numbers = values.map(value => `#${value}`).join(', ')

		let links = ''
		refs.forEach(ref => {
			links += `\n${url}/api/raffledb/void?ref=${ref}`
		})

		const subject =
			valuesLenght > 1
				? `Los números ${numbers} fueron reservados`
				: `El ${numbers} fue reservado`

		const dolarAmount = `$${valuesLenght}`
		const bolivarAmount = `Bs. ${valuesLenght * 40}`

		const data = {
			from: `Raffle0324 <${process.env.MAILGUN_FROM_EMAIL}>`,
			to: 'luiavag@gmail.com',
			subject: `Nuevo participante - ${subject}`,
			text: `Hola,\n\n
      Estos son los datos de la reserva.\n\n
      Número(s) reservado(s): ${numbers} \n
      Nombre participante: ${user} \n
      WhatsApp participante: ${phone} \n
      Total boleto: ${dolarAmount} o ${bolivarAmount} \n\n
      Método de pago: ${payment} \n\n
      Nota: envia al participante los datos de tu Pago Movil o realiza el cobro en efectivo lo antes posible. Si no recibes el pago en 24 horas, puedes hacer click en el(los) siguinete(s) enlace(s) para anular esta reserva: ${links}`,
		}

		return await client.messages().send(data)
	} catch (error) {
		// console.error(error)
		return { message: error.message }
	}
}
