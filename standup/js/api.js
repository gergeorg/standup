import { Notification } from './Notification'

const API_URL = 'https://big-butternut-femur.glitch.me'

export const getComedians = async () => {
	try {
		const res = await fetch(`${API_URL}/comedians`)

		if (!res.ok) {
			throw new Error(`сервер вернул ошибку: ${res.status}`)
		}

		return res.json()
	} catch (error) {
		console.error(`Возникла проблема с запросом: ${error.message}`)

		Notification.getInstance().show('Возникла ошибка сервера, попробуйте позже')
	}
}

export const sendData = async (method, data, id) => {
	try {
		const res = await fetch(`${API_URL}/clients${id ? `/${id}` : ''}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!res.ok) {
			throw new Error(`сервер вернул ошибку: ${res.status}`)
		}

		return true
	} catch (error) {
		console.error(`Возникла проблема с запросом: ${error.message}`)

		Notification.getInstance().show('Возникла ошибка сервера, попробуйте позже')

		return false
	}
}

export const getClient = async (ticket) => {
	try {
		const res = await fetch(`${API_URL}/clients/${ticket}`)

		if (!res.ok) {
			throw new Error(`сервер вернул ошибку: ${res.status}`)
		}

		return res.json()
	} catch (error) {
		console.error(`Возникла проблема с запросом: ${error.message}`)

		Notification.getInstance().show('Возникла ошибка сервера, попробуйте позже')
	}
}
