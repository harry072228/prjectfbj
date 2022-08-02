import socketIO from 'socket.io'
import express from 'express'
import client from './postgres'
export const chatRouter = express.Router()

export let io: socketIO.Server
export function chatRoom(value: socketIO.Server) {
	io = value

	io.on('connection', (socket) => {
		console.log('Connected')
		console.log(`UserID: ${socket.id}`)
		socket.join('18')

		//用session拎名
		let req = socket.request as express.Request //視socket為express

		if (req.session['isUser']) {
			//如果socket入面有user名 (有人登入)
			console.log(`Username: ${req.session['isUser'].username}`)
			console.log(`UserID: ${req.session['isUser'].id}`)
			/* user_id = req.session['user'].id */

			socket.emit('currentUsername', req.session['isUser'].username)

			io.emit(
				'loginChecked',
				`${req.session['isUser'].username} has logged in.`
			)
			//This only emit to single client.
			//^將sessionUsername交俾client side

			//UserOnline
			/* io.emit('getGroupData') */
			io.emit('UserOnline', req.session['isUser'].username)
		}

		//Load history
		/* socket.on('requestPublicChatHistory', async () => {
			try {
				const result = await client.query(
					`SELECT user_name, message_content, created_at::time from (select id, user_name, message_content, created_at from public_channel_chat_history  ORDER by id DESC limit 20) T order by id;`
				)
				const publicHistory = await result.rows
				socket.to('18').emit('showPublicChatHistory', publicHistory)
			} catch (error) {
				console.log(error)
			}
		}) */

		socket.on('requestGroupChatHistory', async (GroupID) => {
			try {
				const data = await client.query(
					`select chat_history_name from chatroom_history_list WHERE chatroom_id = $1`,
					[GroupID]
				)
				const targetedTable = data.rows[0].chat_history_name
				const groupHistory = await client.query(
					`SELECT user_name, message_content, created_at::time from ${targetedTable}`
				)
				socket.emit('requestGroupChatHistory', groupHistory.rows)
			} catch (error) {
				console.log(error)
			}
		})

		socket.on('requestPrivateChatHistory', async (recipientID) => {
			try {
				const userIDfromUsers = await client.query(
					`select users.id from chatroom_list inner join users on chatroom_list.user_id = users.id where chatroom_list.id = $1`,
					[recipientID]
				)
				const trueID = userIDfromUsers.rows[0].id
				const data = await client.query(
					`select a.pch_created_at::time,
					a.username,
					a.message_content,
                    a.idTwo
				from (
						select *,
							private_chat_history.created_at AS pch_created_at,
                            private_chat_history.id as idTwo
						from private_chat_history
							join users on private_chat_history.send_user = users.id
						where send_user = $1
							and receive_user = $2
							or send_user = $2
							and receive_user = $1
						ORDER by private_chat_history.id desc
						limit 20
					) AS a ORDER by a.idTwo`,
					[trueID, req.session['isUser'].id]
				)
				const result = data.rows
				socket.emit('showPrivateChatHistory', result)
			} catch (error) {
				console.log(error)
			}
		})

		//Public chat
		socket.on('publicMessage', async (message: string) => {
			try {
				//Server get message from client side
				await client.query(
					`insert into public_channel_chat_history (user_name, user_id, message_content, created_at) values ('${req.session['isUser'].username}', '${req.session['isUser'].id}', '${message}' , now())`
				)
				io.to('18').emit(
					'publicMessage',
					message,
					req.session['isUser'].username
				)
			} catch (error) {
				console.log(error)
			}
		})

		//Get group data

		socket.on('getGroupData', async () => {
			try {
				let roomData = await client.query(
					`select chatroom_id,chatroom_name, chatroom_list.updated_at from chatroom_member_relationship 
					inner join chatroom_list
					on chatroom_member_relationship.chatroom_id=chatroom_list.id
					inner join users
					on chatroom_member_relationship.user_id = users.id where users.id = $1 order by chatroom_list.updated_at DESC limit 3`,
					[req.session['isUser'].id]
				)
				let availableChatroomData = roomData.rows
				let userData = await client.query(
					`select chatroom_name, id, chatroom_properties  from chatroom_list where chatroom_properties != 'group' order by chatroom_list.updated_at DESC limit 10;`
				)
				let recentUser = userData.rows
				socket.emit('showChatroom', availableChatroomData, recentUser)
				
			} catch (error) {
				console.log(error)
			}
		})

		//I can't fix this yet.
		socket.on('getMembers', async (currentRoom) => {
			try {
				const result = await client.query(
					`select username,user_id from chatroom_member_relationship 
					inner join users
					on chatroom_member_relationship.user_id=users.id where chatroom_id = $1`,
					[currentRoom]
				)
				const membersList = result.rows
				console.log(membersList)
				socket.emit('showMembers', membersList)
			} catch (error) {
				console.log(error)
			}
		})

		//search user
		socket.on('searchUser', async (data) => {
			try {
				const result = await client.query(
					`select chatroom_list.id,
					username,
					user_id
				from users
					inner join chatroom_list on users.id = chatroom_list.user_id
				WHERE username ilike '%${data}%' and username != 'groupgroup' limit 10;`
				)
				const searchResult = result.rows
				socket.emit('possibleUser', searchResult)
			} catch (error) {
				console.log(error)
			}
		})

		socket.on('joinRoom', (data) => {
			console.log('user joined:' + data)
			socket.join(data)
		})

		socket.on('leaveRoom', (data) => {
			socket.leave(data)
		})

		socket.on('disconnect', () => {
			console.log('User has gone offline.')
		})

		socket.on(
			'privateMessage',
			async (recipientID, message, roomProperties) => {
				console.log(
					`recipientID: ${recipientID},message: ${message}, roomProperties: ${roomProperties}`
				)

				if (recipientID == 'public') {
					return
				}

				if (roomProperties == 'chatroom') {
					console.log('roomProperties: ' + roomProperties)
					try {
						//TS收到join room event
						socket.emit('room_id', `user join room ${recipientID}`)
						const data = await client.query(
							`select chat_history_name from chatroom_history_list WHERE chatroom_id = $1`,
							[recipientID]
						)
						const targetedTable = data.rows[0].chat_history_name
						await client.query(
							`insert into ${targetedTable} (user_name, user_id, message_content, created_at) values ('${req.session['isUser'].username}', '${req.session['isUser'].id}', '${message}' , now())`
						)

						await client.query(
							`UPDATE chatroom_list SET updated_at = now() where id  = $1`, [recipientID]
						)

						console.log('update done')

						io.to(recipientID).emit(
							`groupMessage`,
							message,
							req.session['isUser'].username
						)
					} catch (error) {
						console.log(error)
					}
				}

				if (roomProperties == 'private') {
					console.log('roomProperties: ' + roomProperties)
					try {
						const userIDfromUsers = await client.query(
							`select users.id from chatroom_list inner join users on chatroom_list.user_id = users.id where chatroom_list.id = $1`,
							[recipientID]
						)
						const trueRecipientID = userIDfromUsers.rows[0].id
						const myID = await client.query(
							`select chatroom_list.id, chatroom_name from chatroom_list inner join users on chatroom_list.user_id = users.id where users.id = $1`,
							[req.session['isUser'].id]
						)
						const trueSenderID = myID.rows[0].id
						const chatroomName = myID.rows[0].chatroom_name

						socket.emit('room_id', `user join room ${recipientID}`)
						await client.query(
							`insert into private_chat_history (send_user, message_content, receive_user, created_at) values ('${req.session['isUser'].id}', '${message}', '${trueRecipientID}' , now())`
						)

						await client.query(
							`update chatroom_list set updated_at = now() where id = $1`,[recipientID]
						)

						io.to(recipientID).emit(
							'showPrivateMessage',
							message,
							req.session['isUser'].username
						)

						io.emit('messageNotification', chatroomName)

						io.to(trueSenderID).emit(
							'showPrivateMessage',
							message,
							req.session['isUser'].username
						)
					} catch (error) {
						console.log(error)
					}
				}
			}
		)

		socket.on('createGroup', async (chatroomName, username, userID) => {
			try {
				//remove blank space
				let noBlankSpace = chatroomName.replace(/\s/g, '')
				console.log(noBlankSpace)
				const history_name = noBlankSpace + '_history'
				const userIDfromUsers = await client.query(
					`select users.id from chatroom_list inner join users on chatroom_list.user_id = users.id where chatroom_list.id = $1`,
					[userID]
				)
				const trueID = userIDfromUsers.rows[0].id

				await client.query(`create table ${history_name} (
					id serial,
					user_name varchar NULL,
					message_content varchar NULL,
					created_at timestamptz NULL,
					user_id int4 NULL
				)`)

				let historyResult = await client.query(
					`insert into chatroom_history_list (chat_history_name) VALUES ($1) RETURNING id`,
					[history_name]
				)
				let historyID = historyResult.rows[0].id

				let chatroomIDresult = await client.query(
					`insert into chatroom_list (chatroom_name, history_id, user_id, chatroom_properties) values ($1, $2, 33, 'group') RETURNING id`,
					[chatroomName, historyID]
				)
				let chatroomID = chatroomIDresult.rows[0].id

				await client.query(
					`update chatroom_history_list set chatroom_id =$1 where id = $2`,
					[chatroomID, historyID]
				)

				await client.query(
					`insert into chatroom_member_relationship (chatroom_id, user_id) values ($1, $2)`,
					[chatroomID, trueID]
				)

				await client.query(
					`insert into chatroom_member_relationship (chatroom_id, user_id) values ($1, $2)`,
					[chatroomID, req.session['isUser'].id]
				)
				await socket.emit('refreshGroup')
				await socket.emit(
					'redirectUserToNewGroup',
					chatroomID,
					chatroomName,
					'chatroom'
				)
			} catch (error) {
				console.log(error)
			}
		})

		socket.on('addMember', async (id, username, roomID) => {
			try {
				console.log(id, username, roomID)
				let idResult = await client.query(
					`select users.id from chatroom_list inner join users on chatroom_list.user_id = users.id where chatroom_list.id = $1`,
					[id]
				)
				let trueID = idResult.rows[0].id
				console.log('userID: ' + trueID)
				console.log(roomID)
				await client.query(
					`insert into chatroom_member_relationship (chatroom_id, user_id) values ($1, $2)`,
					[roomID, trueID]
				)
				console.log('username: '+ username)
				console.log('add member success')
				await socket.emit('refreshGroup')
			} catch (error) {
				console.log(error)
			}
		})
	})
}

