import { deleteRaffleSlots_0324 } from '@/utils/faunadb'

export default async function handler(req, res) {
	const { ref } = req.query
	try {
		const refsArr = ref.split(',')
		await deleteRaffleSlots_0324(refsArr)
		res.status(200).json({ message: 'Ok!' })
	} catch (error) {
		res.status(400).json({ error: 'Reserva no encontrada o ya eleiminada' })
	}
}
