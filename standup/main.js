import { createComedianBlock } from './js/createComedianBlock'
import './style.css'

const bookingComediansList = document.querySelector('.booking__comedians-list')

const init = () => {
	const comedianBlock = createComedianBlock()

	bookingComediansList.append(comedianBlock)
}

init()
