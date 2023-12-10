import TomSelect from 'tom-select'

export const createComedianBlock = () => {
	const bookingComedian = document.createElement('li')
	bookingComedian.classList.add('booking__comedian')

	const bookingSelectComedian = document.createElement('select')
	bookingSelectComedian.classList.add('booking__select', 'booking__select_comedian')

	const bookingSelectTime = document.createElement('select')
	bookingSelectTime.classList.add('booking__select', 'booking__select_time')

	const inputHidden = document.createElement('input')
	inputHidden.type = 'hidden'
	inputHidden.name = 'booking'

	const bookingHallBtn = document.createElement('button')
	bookingHallBtn.classList.add('booking__hall')

	bookingComedian.append(bookingSelectComedian, bookingSelectTime, inputHidden)

	const bookingTomSelectComedian = new TomSelect(bookingSelectComedian, {
		hideSelected: true,
		placeholder: 'Выбрать комика',
		options: [
			{
				value: 1,
				text: 'Юлия Ахмедова',
			},
			{
				value: 2,
				text: 'Слава Комиссаренко',
			},
		],
	})

	const bookingTomSelectTime = new TomSelect(bookingSelectTime, {
		hideSelected: true,
		placeholder: 'Время',
	})

	bookingTomSelectTime.disable()

	bookingTomSelectComedian.on('change', () => {
		bookingTomSelectTime.enable()
		bookingTomSelectComedian.blur()

		bookingTomSelectTime.addOption([
			{
				value: 1,
				text: '17:00',
			},
			{
				value: 2,
				text: '22:00',
			},
		])
	})

	bookingTomSelectTime.on('change', () => {
		bookingTomSelectTime.blur()
		bookingComedian.append(bookingHallBtn)
		bookingHallBtn.textContent = 'Зал 1'
	})

	return bookingComedian
}

// <li class='booking__comedian'>
// 	<select class='booking__select booking__select_comedian' name='comedian'>
// 		<option value='1'>Юлия Ахмедова</option>
// 		<option value='2 '>Слава Комиссаренко</option>
// 	</select>

// 	<select class='booking__select booking__select_time' name='time'>
// 		<option value='1'>17:00</option>
// 		<option value='2 '>20:00</option>
// 	</select>

// 	<button class='booking__hall'>Зал 1</button>
// </li>
