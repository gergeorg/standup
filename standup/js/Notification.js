export class Notification {
	static instance

	constructor () {
		if (Notification.instance) {
			return Notification.instance
		}

		this.timeout = 3000

		Notification.instance = this
	}

	static getInstance() {
		if (!Notification.instance) {
			Notification.instance = new Notification()
		}

		return Notification.instance
	}

	show(msg, isSuccess) {
		const notification = this.createNotification(msg, isSuccess)
		document.body.append(notification)
		this.animationNotification(notification, true)

		setTimeout(() => {
			this.animationNotification(notification, false).then(() => {
				notification.remove()
			})
		}, this.timeout)
	}

	createNotification(msg, isSuccess) {
		const notification = document.createElement('div')
		notification.className = `notification ${isSuccess ? 'notification_success' : 'notification_error'}`
		notification.textContent = msg

		return notification
	}

	animationNotification(notification, show) {
		return new Promise ((resolve) => {
			if (show) {
				requestAnimationFrame(()=> {
					notification.classList.add('notification_show')
					resolve()
				}) 
			} else {
				notification.classList.remove('notification_show')
				setTimeout(resolve, 500)
			}
		})
	}
}

