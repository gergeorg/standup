import { createComedianBlock } from "./createComedianBlock"

export const initChangeSection = (event, booking, reserveButton, editButton, bookingTitle, bookingForm, comedians, bookingComediansList) => {
	reserveButton.style.transition = ('opacity .5s, visibility .5s')
	editButton.style.transition = ('opacity .5s, visibility .5s')
	
	reserveButton.classList.remove('event__button_hidden')
	editButton.classList.remove('event__button_hidden')

	const changeSection = () => {
		event.classList.toggle('event__hidden')
		booking.classList.toggle('booking__hidden')

		if (!booking.classList.contains('booking__hidden')) {
			const comedianBlock = createComedianBlock(comedians, bookingComediansList)
			bookingComediansList.append(comedianBlock)
		}
	}

	reserveButton.addEventListener('click', () => {
		changeSection()
		bookingTitle.textContent = 'Забронируйте место в зале'
		bookingForm.method = 'POST'
	})

	editButton.addEventListener('click', () => {
		changeSection()
		bookingTitle.textContent = 'Редактирование брони'
		bookingForm.method = 'PATCH'
	})

	return changeSection
}


