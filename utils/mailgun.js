import mailgun from 'mailgun-js'

const client = mailgun({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN,
})

export async function mailRaffle0324Notification(data) {
	const { value, user, phone, payment, ref } = data

	try {
		if (!value || !user || !phone || !payment || !ref) {
			throw new Error(`Campos requeridos incompletos!`)
		}

		const url =
			process.env.NODE_ENV === 'development'
				? `http://localhost:3000`
				: 'https://next-budget-app-three.vercel.app'

		const link = `${url}/api/raffledb/void?ref=${ref}`

		const data = {
			from: `Raffle0324 <${process.env.MAILGUN_FROM_EMAIL}>`,
			to: 'luiavag@gmail.com',
			subject: `Nuevo participante - El #${value} fue reservado`,
			text: `Hola,\n\n
      Estos son los datos de la reserva.\n\n
      Número reservado: #${value} \n
      Nombre participante: ${user} \n
      WhatsApp participante: ${phone} \n
      Método de pago: ${payment} \n\n
      Nota: envia al participante los datos de tu Pago Movil o realiza el cobro en efectivo lo antes posible. Si no recibes el pago en 24 horas, puedes hacer click en el siguinete enlace para anular esta reserva: ${link}`,
		}

		return await client.messages().send(data)
	} catch (error) {
		// console.error(error)
		return { message: error.message }
	}
}
