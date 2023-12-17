import { createComedianBlock } from './js/createComedianBlock.js'
import { getComedians } from './js/getComedians.js'
import { Notification } from './js/notification.js'
import './style.css'

const bookingComediansList = document.querySelector('.booking__comedians-list')
const bookingForm = document.querySelector('.booking__form')

const notification = Notification.getInstance()
// setTimeout(() => {
// 	notification.show('hello', false)
// }, 3000)



const init = async () => {
	const countComedians = document.querySelector('.event__info-item_comedians .event__info-number')
	const comedians = await getComedians()

	countComedians.textContent = comedians.length

	const comedianBlock = createComedianBlock(comedians)

	bookingComediansList.append(comedianBlock)

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
