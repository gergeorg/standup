import { Notification } from "./Notification";

export const getComedians = async () => {
	try {
		const res = await fetch('http://localhost:8080/comedians')

		if (!res.ok) {
			throw new Error(`сервер вернул ошибку: ${res.status}`)
		}

		return res.json()
	} catch (error) {
		console.error(`Возникла проблема с запросом: ${error.message}`);

		Notification.getInstance().show('Возникла ошибка сервера, попробуйте позже')
	}
}


export const sendData = async (method, data, id) => {
	try {
		const res = await fetch(`http://localhost:8080/clients${id ? `/${id}` : ''}`, 
		{
			method,
			headers: {
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify(data)
		})

		if (!res.ok) {
			throw new Error(`сервер вернул ошибку: ${res.status}`)
		}

		return true
	} catch (error) {
		console.error(`Возникла проблема с запросом: ${error.message}`);

		Notification.getInstance().show('Возникла ошибка сервера, попробуйте позже')

		return false
	}
}