const encode = (data) => {
	if(data == '') return ''

	let encoded = `${data.length}-`
	let buff = data[0]
	let counter = 1

	for(let i = 1; i<data.length; i++) {
		if (buff == data[i]) {
			counter++
		} else {
			encoded=`${encoded}${counter}${buff}`
			buff=data[i]
			counter=1
		}
	}
	encoded=`${encoded}${counter}${buff}`

	return encoded
}

const decode = (data) => {
	if(data == '') return ''

	data = data.split('-')
	const finalCount = data[0]
	data = data[1]

	let decoded = ''
	let acc = ''
	for(let i =0 ; i< data.length; i++) {
		if (parseInt(data[i]) == data[i]) {
			acc = acc + '' + data[i]
		} else {
			for (let j = 0; j < parseInt(acc); j++) {
				decoded += data[i]
			}
			acc = ''
		}
	}

	if (decoded.length != finalCount) {
		console.log("err")
	}

	return decoded
}
export { encode, decode }