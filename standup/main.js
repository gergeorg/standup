import Inputmask from 'inputmask'
import JustValidate from 'just-validate'

import { createComedianBlock } from './js/createComedianBlock.js'
import { getComedians } from './js/getComedians.js'
import { Notification } from './js/notification.js'
import './style.css'

const bookingComediansList = document.querySelector('.booking__comedians-list')
const bookingForm = document.querySelector('.booking__form')

const notification = Notification.getInstance()

const init = async () => {
	const countComedians = document.querySelector('.event__info-item_comedians .event__info-number')
	const comedians = await getComedians()

	countComedians.textContent = comedians.length

	const comedianBlock = createComedianBlock(comedians)

	bookingComediansList.append(comedianBlock)

	const validate = new JustValidate(bookingForm, {
		errorFieldCssClass: 'booking__input_invalid',
		successFieldCssClass: 'booking__input_valid',
	})

	const bookingInputFullname = document.querySelector('.booking__input_fullname')
	const bookingInputPhone = document.querySelector('.booking__input_phone')
	const bookingInputTicket = document.querySelector('.booking__input_ticket')

	new Inputmask('+7(999)-999-99-99').mask(bookingInputPhone)
	new Inputmask('99999999').mask(bookingInputTicket)

	validate
		.addField(bookingInputFullname, [
			{
				rule: 'required',
				errorMessage: 'Заполните имя'
			}
		])

		.addField(bookingInputPhone, [
			{
				rule: 'required', 
				errorMessage: 'Заполните телефон'
			}, 
			{
				validator() {
					const phone = bookingInputPhone.inputmask.unmaskedvalue()
					return phone.length === 10 && !!Number(phone)
				},
				errorMessage: 'Некорректный телефон'
			}
		])

		.addField(bookingInputTicket, [
			{
				rule: 'required', 
				errorMessage: 'Заполните номер билета'
			}, 
			{
				validator() {
					const ticket = bookingInputTicket.inputmask.unmaskedvalue()
					return ticket.length === 8 && !!Number(ticket)
				},
				errorMessage: 'Неверный номер билета',
			}
]).onFail((fields) => {
	console.log('fields: ', fields);
	let errorMessage = ''

	for (const key in fields) {
		if (!Object.hasOwnProperty.call(fields, key)) {
			continue			
		}

		const elem = fields[key]
		if (!elem.isValid) {
			errorMessage += `${elem.errorMessage}, `
		}
	}

	notification.show(errorMessage.slice(0, -2), false)
})



	bookingForm.addEventListener('submit', (e) => {
		e.preventDefault()

		const data = { booking: [] }
    const times = new Set()

    new FormData(bookingForm).forEach((value, field) => {

      if (field === 'booking') {
        const [comedian, time] = value.split(',')

        if (comedian && time) {
          data.booking.push({ comedian, time })
          times.add(time)
        }
      } else {
        data[field] = value
      }
      if (times.size !== data.booking.length) {
				notification.show('Нельзя быть в одно время на 2-х выступлениях', false)
      }
    })
	})
}

init()
