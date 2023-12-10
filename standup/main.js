import { createComedianBlock } from './js/createComedianBlock'
import { getComedians } from './js/getComedians'
import './style.css'

const bookingComediansList = document.querySelector('.booking__comedians-list')

const init = async () => {
	const countComedians = document.querySelector('.event__info-item_comedians .event__info-number')
	const comedians = await getComedians()
	console.log('comedians: ', comedians)

	countComedians.textContent = comedians.length

	const comedianBlock = createComedianBlock(comedians)

	bookingComediansList.append(comedianBlock)
}

init()
