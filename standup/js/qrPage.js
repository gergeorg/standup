import { Notification } from './Notification'
import { getClient, getComedians } from './api'
import { displayBooking, displayClientInfo } from './display'

const getTicketNumber = () => {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	return urlParams.get('t')
}

export const initQrPage = async () => {
	const clientInfo = document.querySelector('.booking__client-info')
	const perfomance = document.querySelector('.booking__perfomance')

	const ticketNumber = getTicketNumber()

	if (ticketNumber) {
		const clientData = await getClient(ticketNumber)
		displayClientInfo(clientInfo, clientData)

		const comediansData = await getComedians(ticketNumber)
		displayBooking(perfomance, clientData, comediansData)
	} else {
		Notification.getInstance().show('Произошла ошибка. Проверьте ссылку')
	}
}
