import fs from 'node:fs/promises'

export const checkFile = async (path, createIfMisssing) => {
	if (createIfMisssing) {
		try {
			await fs.access(path)
		} catch (error) {
			await fs.writeFile(path, JSON.stringify([]))
			console.log('error: ', error)
			console.log(`Файл ${path} был создан`)
			return true
		}
	}

	try {
		await fs.access(path)
	} catch (error) {
		console.log('error: ', error)
		console.error(`Файл ${path} не найден`)
		return false
	}

	return true
}
