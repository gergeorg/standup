import { CLIENTS } from '../index.js'
import { sendData, sendError } from './send.js'
import fs from 'node:fs/promises'

export const handleUpdateClient = (req, res, segments) => {
	let body = ''
	const ticketNumber = segments[1]

	try {
		req.on('data', (chunk) => {
			body += chunk
		})
	} catch (error) {
		console.log('Ошибка при чтении запроса')
		sendError(res, 500, 'Ошибка сервера при чтении запроса')
	}

	req.on('end', async () => {
		try {
			const updateDataClient = JSON.parse(body)

			if (!updateDataClient.fullName || !updateDataClient.phone || !updateDataClient.ticketNumber || !updateDataClient.booking) {
				sendError(res, 400, 'Не верные основные данные клиента')
				return
			}

			if (
				updateDataClient.booking &&
				(!updateDataClient.booking.length ||
					!Array.isArray(updateDataClient.booking) ||
					!updateDataClient.booking.every((item) => item.comedian && item.time))
			) {
				sendError(res, 400, 'Отсутствует список бронирования')
				return
			}

			const clientData = await fs.readFile(CLIENTS, 'utf8')
			const clients = JSON.parse(clientData)

			const clientIdx = clients.findIndex((c) => c.ticketNumber === ticketNumber)

			if (clientIdx === -1) {
				sendError(res, 404, 'Клиент данным номером билета не найден')
			}

			clients[clientIdx] = {
				...clients[clientIdx],
				...updateDataClient,
			}

			await fs.writeFile(CLIENTS, JSON.stringify(clients))

			sendData(res, clients[clientIdx])
		} catch (error) {
			console.error(`error: ${error}`)
			sendError(res, 500, 'Ошибка сервера при обновлении данных')
		}
	})
}