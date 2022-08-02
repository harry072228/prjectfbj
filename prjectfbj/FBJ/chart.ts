import express from 'express'
import client from './postgres'
import http from 'http'
import { Server as SocketIO } from 'socket.io'

const app = express()
const server = new http.Server(app)
const io = new SocketIO(server)
io.on('connection', function (socket) {
	/* console.log(socket) */
})
const PORT = 8000
client.connect()
app.use(express.static('chart'))

app.get('/employeeData', async (req,res) => {
	try{
	const result = await client.query(
		'SELECT username,personal_turnover from users where personal_turnover is not null' // query the database for all users，frontend可直接入pg；backend拎出來要經json暫存
	)
	res.json(result.rows)
	}catch(error){
		console.log(error)
	}
})

server.listen(PORT, () => console.log(`http://localhost:${PORT}/chart.html`))
