import { getComedians } from './js/api.js'
import { initForm } from './js/initForm.js'
import { initChangeSection } from './js/changeSection.js'
import { initQrPage } from './js/qrPage.js'

import './style.css'

const init = async () => {
	if (window.location.pathname.endsWith('qr.html')) {
		initQrPage()
		return
	}

	const bookingComediansList = document.querySelector('.booking__comedians-list')
	const bookingForm = document.querySelector('.booking__form')
	const countComedians = document.querySelector('.event__info-item_comedians .event__info-number')
	const bookingInputFullname = document.querySelector('.booking__input_fullname')
	const bookingInputPhone = document.querySelector('.booking__input_phone')
	const bookingInputTicket = document.querySelector('.booking__input_ticket')
	const event = document.querySelector('.event')
	const booking = document.querySelector('.booking')
	const reserveButton = document.querySelector('.event__button_reserve')
	const editButton = document.querySelector('.event__button_edit')
	const bookingTitle = document.querySelector('.booking__title')

	const comedians = await getComedians()

	if (comedians) {
		countComedians.textContent = comedians.length
		const changeSection = initChangeSection(event, booking, reserveButton, editButton, bookingTitle, bookingForm, comedians, bookingComediansList)
		initForm(bookingForm, bookingInputFullname, bookingInputPhone, bookingInputTicket, changeSection, bookingComediansList)
	}
}

init()
