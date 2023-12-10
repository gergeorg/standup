export const getComedians = async () => {
	const res = await fetch('http://localhost:8080/comedians')

	return res.json()
}
