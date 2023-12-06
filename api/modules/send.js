export const sendData = (res, data) => {
	res.writeHead(200, {
		'Content-Type': 'text/json; charset=utf8',
		// 'Access-Control-Allow-Origin': '*',
	})

	res.end(JSON.stringify(data))
}

export const sendError = (res, statusCode, errMsg) => {
	res.writeHead(statusCode, {
		'Content-Type': 'text/plain; charset=utf8',
	})

	res.end(errMsg)
}
