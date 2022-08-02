import express from 'express'
import expressSession from 'express-session'
import client from './postgres'
import { userRouter } from './userRoutes'
import { chartRouter } from './chartRoutes'
import {isLogin} from './middleRoutes'
import grant from 'grant'
import { timetableRouter } from './timetableRoutes'
import { kanbanMainRouter } from './kanbanMainRoutes'
import { kanbanListRouter } from './kanbanListRoutes'
import http from 'http'
import { Server } from 'socket.io'
import { chatRoom } from './socket'
import {chatRouter} from './socket'
import {profileRouter} from './profileRoutes'


const app = express()
const server = new http.Server(app)
const io = new Server(server)

const PORT = process.env.PORT || 8000

const sessionMiddleware = expressSession({
	secret: 'Tecky Academy teaches typescript',
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false }
})
app.use(sessionMiddleware)
// <<< grant
const grantExpress = grant.express({
	defaults: {
		origin: `http://localhost:${PORT}`,
		transport: 'session',
		state: true
	},
	google: {
		key: process.env.GOOGLE_CLIENT_ID || '',
		secret: process.env.GOOGLE_CLIENT_SECRET || '',
		scope: ['profile', 'email'],
		callback: '/login/google'
	}
})


userRouter.use(grantExpress as express.RequestHandler)
// >>> grant

// app.use((req, res, next) => {
// 	console.log(req.ip + ': ' + req.url)
// 	next()
// })


io.use((socket, next) => {
	let req = socket.request as express.Request
	let res = req.res as express.Response
	sessionMiddleware(req, res, next as express.NextFunction)
})

chatRoom(io)


client.connect()

app.use(express.urlencoded())
app.use(express.json())

app.use(express.static('public'))
app.use(express.static('uploads'))

app.use(userRouter)


app.use(isLogin, express.static('private'))
app.use(chatRouter)
app.use(profileRouter)

app.use(express.static('chatroom'))
app.use(express.static('timeTable'))
app.use(express.static('kanban'))
// app.use(express.static('private/chart')) //private 暫時public

app.use(chartRouter) //private 暫時public
app.use(timetableRouter)
app.use(kanbanMainRouter)
app.use(kanbanListRouter)






//Server send message to client side
app.post('/sendChat', (req, res) => {
	io.emit('messageFromServer', 'message received')
	res.json({ updated: 1 })
})

app.get('/post')


app.use((req, res) => {
	res.status(404)
	res.send('Error')
})

server.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`)
	console.log(`http://localhost:${PORT}/chart.html`)
	console.log(`http://localhost:${PORT}/chatroom/chatroom.html`)
})
