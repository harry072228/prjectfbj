const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket = io()
const date = new Date()
const time = date.toLocaleTimeString()
let myName = null
let currentRoom = 'public'
let roomProperties = 'chatroom'
let privateMessageReceiverID = null

//get username
socket.on('currentUsername', (data) => {
	console.log(`sessionUsername: ${data}`)
	myName = data
})

//Load history of public messages
socket.on('loginChecked', (data) => {
	showMessage(data, 'System', time)
	chatMessages.scrollTop = chatMessages.scrollHeight
})

socket.on('showPublicChatHistory', (data) => {
	for (let history of data) {
		showMessage(
			history.message_content,
			history.user_name,
			history.created_at
		)
	}
	chatMessages.scrollTop = chatMessages.scrollHeight
})

//Load history of group messages
socket.on(`publicMessage`, (message, username) => {
	showMessage(message, username, time)
	//Scroll down
	chatMessages.scrollTop = chatMessages.scrollHeight
})

//show group message
socket.on(`groupMessage`, (message, username) => {
	showMessage(message, username, time)
	//Scroll down
	chatMessages.scrollTop = chatMessages.scrollHeight
})

//show private message
socket.on('showPrivateMessage', (message, username) => {
	showMessage(message, username, time)
	//Scroll down
	chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', (event) => {
	event.preventDefault() //Don't send file out.
	let clientMessage = document.querySelector('input') //Get message from html input.
	socket.emit(
		'privateMessage',
		currentRoom,
		clientMessage.value,
		roomProperties
	)
	//clear input after you send message.
	clientMessage.value = ''
	clientMessage.focus()
})

//User Logout.
/* document.querySelector('.logout').addEventListener('click', function () {
	socket.emit('disconnect', { message: 'logout' })joinRoom
}) */

//User Online
/* socket.on('UserOnline', (username) => {
	if (username == undefined) {
		return
	}
	if (username !== myName) {
		const li = document.createElement('li')
		li.innerHTML = username
		document.getElementById('chatList').appendChild(li)
		if (element == `<li>${username}</li>`) {
			return
		}
	}
}) */

//Find chatroom
socket.emit('getGroupData')

let intervalID = setInterval(autoRefresh, 1500);
function autoRefresh() {
	socket.emit('getGroupData')
	socket.emit('getMembers', currentRoom)
}

//Show chatroom
socket.on(
	'showChatroom',
	(availableChatroomData, recentUser, roomProperties) => {
		document.getElementById('chatList').innerHTML = ''
		roomname = []
		roomID = []
		

		for (let data of availableChatroomData) {
			roomID.push(data.chatroom_id)
			roomname.push(data.chatroom_name)
			const li = document.createElement('li')
			li.value = data.chatroom_id
			li.innerHTML = data.chatroom_name
			li.classList.add('chatroom')
			document.getElementById('chatList').appendChild(li)
		}

		for (let user of recentUser) {
			if (user.chatroom_name !== myName) {
				const li = document.createElement('li')
				li.value = user.id
				li.innerHTML = user.chatroom_name
				li.classList.add(`${user.chatroom_properties}`)
				document.getElementById('chatList').appendChild(li)
			}
		}
		//Change chatroom
		const chatrooms = document.querySelectorAll('#chatList > li')
		for (chatroom of chatrooms) {
			const chatroomName = chatroom.innerHTML
			const chatroomID = chatroom.value
			const userID = chatroom.id
			const chatroomProperties = chatroom.classList.value
			chatroom.addEventListener('click', async () => {
				roomProperties = chatroomProperties
				changeRoom(chatroomID, chatroomName, roomProperties)
				return
			})
		}
	}
)

socket.on(
	'showChatroom',
	(availableChatroomData, recentUser, roomProperties) => {
		document.getElementById('chatList').innerHTML = ''
		roomname = []
		roomID = []
		

		for (let data of availableChatroomData) {
			roomID.push(data.chatroom_id)
			roomname.push(data.chatroom_name)
			const li = document.createElement('li')
			li.value = data.chatroom_id
			li.innerHTML = data.chatroom_name
			li.classList.add('chatroom')
			document.getElementById('chatList').appendChild(li)
		}

		for (let user of recentUser) {
			if (user.chatroom_name !== myName) {
				const li = document.createElement('li')
				li.value = user.id
				li.innerHTML = user.chatroom_name
				li.classList.add(`${user.chatroom_properties}`)
				document.getElementById('chatList').appendChild(li)
			}
		}
		//Change chatroom
		const chatrooms = document.querySelectorAll('#chatList > li')
		for (chatroom of chatrooms) {
			const chatroomName = chatroom.innerHTML
			const chatroomID = chatroom.value
			const userID = chatroom.id
			const chatroomProperties = chatroom.classList.value
			chatroom.addEventListener('click', async () => {
				roomProperties = chatroomProperties
				changeRoom(chatroomID, chatroomName, roomProperties)
				return
			})
		}
	}
)

//back to public channel
document.querySelector('#publicChannel').addEventListener('click', () => {
	if (currentRoom == 'public') {
		return
	} else {
		currentRoom = 'public'
		document.querySelector('.findMember').innerHTML = 'Search User'
		roomProperties = 'chatroom'
		document.querySelector('.groupInfo').classList.add('none')
		document.querySelector('.chat-messages').innerHTML = ''
		document.querySelector('#chat-name').innerHTML = 'Public Channel'
		changeRoom(18, 'Public Channel', 'chatroom')
		socket.emit('requestPublicChatHistory')
		return
	}
})

socket.on('showPublicChatHistory', (data) => {
	for (let history of data) {
		showMessage(
			history.message_content,
			history.user_name,
			history.created_at
		)
	}
	chatMessages.scrollTop = chatMessages.scrollHeight
})

socket.on('room_id', (data) => {
	console.log(data)
})

/* socket.on('getRoomID', (roomID) => {
	socket.on(roomID, async (message, username) => {
		console.log('Get from server: ' + message)
		document.querySelector('.chat-messages').innerHTML = ''
		await showMessage(message, username, time)
		//Scroll down
		chatMessages.scrollTop = chatMessages.scrollHeight
	})
}) */

function showMembers() {
	if (currentRoom !== 'public' && roomProperties == 'chatroom') {
		document.querySelector('.groupInfo').classList.remove('none')
		socket.emit('getMembers', currentRoom)
		socket.on('showOwner', (data) => {
			document.querySelector('.groupMemberList').innerHTML = data
		})
		socket.on('showMembers', (membersList) => {
			document.querySelector('.groupMemberList').innerHTML = ''
			for (let member of membersList) {
				const div = document.createElement('div')
				div.classList.add('groupMember')
				div.innerHTML = member.username
				document.querySelector('.groupMemberList').appendChild(div)
			}
		})
	}
}

//Create a function that would add a div on html.
function showMessage(message, username, time) {
	let receivedTime = time.substring(0, 5)
	let container = document.querySelector('.chat-messages')
	if (username == undefined) {
		const div = document.createElement('div')
		div.classList.add('message')
		div.innerHTML = `<p class="meta">System <span>${receivedTime}</span></p>
    <p class="text">${message}</p>`
		container.appendChild(div)
	} else if (username == myName) {
		const div = document.createElement('div')
		div.classList.add('message')
		div.classList.add('item-right')
		div.innerHTML = `<p class="meta">${username} <span>${receivedTime}</span></p>
    <p class="text">${message}</p>`
		container.appendChild(div)
	} else {
		const div = document.createElement('div')
		div.classList.add('message')
		div.innerHTML = `<p class="meta">${username} <span>${receivedTime}</span></p>
    <p class="text">${message}</p>`
		container.appendChild(div)
	}
}

//Show user
function showUser(users) {
	if (users == '') {
		const li = document.createElement('li')
		li.innerHTML = 'No user found.'
		document.querySelector('.possibleUsers').appendChild(li)
	} else {
		for (let user of users) {
			if (user.username !== myName) {
				const li = document.createElement('li')
				li.classList.add('username')
				li.value = user.id
				li.innerHTML = user.username
				document.querySelector('.possibleUsers').appendChild(li)
			}
		}
	}

	const searchedUsers = document.querySelectorAll('.possibleUsers > li')
	for (user of searchedUsers) {
		const userID = user.value
		const username = user.innerHTML
		user.addEventListener('click', () => {
			document.getElementById('username').value = ''
			document.getElementById('id').value = ''
			document.getElementById('username').value = username
			document.getElementById('id').value = userID
			return
		})
	}
}

//change room
function changeRoom(roomID, chatroomName, properties) {
	socket.emit('leaveRoom', currentRoom)
	currentRoom = roomID
	roomProperties = properties
	if (roomProperties == 'private' || currentRoom == 18) {
		document.querySelector('.findMember').innerHTML = 'Search User'
		document.querySelector('.groupInfo').classList.add('none')
	}
	socket.emit('joinRoom', currentRoom)
	document.querySelector('.chat-messages').innerHTML = ''
	document.querySelector('#chat-name').innerHTML = chatroomName
	if (roomProperties == 'chatroom' && currentRoom != 18) {
		document.querySelector('.findMember').innerHTML = 'Add User'
		showMembers()
		socket.emit('requestGroupChatHistory', roomID)
	}
	if (roomProperties == 'private') {
		socket.emit('requestPrivateChatHistory', roomID)
		document.querySelector('.findMember').innerHTML = 'Search User'
	}
	return
}

socket.on('requestGroupChatHistory', (data) => {
	for (let history of data) {
		showMessage(
			history.message_content,
			history.user_name,
			history.created_at
		)
	}
	chatMessages.scrollTop = chatMessages.scrollHeight
})

socket.on('showPrivateChatHistory', (data) => {
	for (let history of data) {
		showMessage(
			history.message_content,
			history.username,
			history.pch_created_at
		)
	}
	chatMessages.scrollTop = chatMessages.scrollHeight
	return
})

//Search user
document.querySelector('.findMember').addEventListener('click', async () => {
	const { value: formValues } = await Swal.fire({
		toast: true,
		title: 'Search Member',
		showCancelButton: true,
		background: '#695cfe',
		html:
			'<div class="possibleUsers"></div>' +
			'<input id="username" class="swal2-input" placeholder="Username">' +
			'<input id="id" class="swal2-input" placeholder="ID">',

		didOpen: (toast) => {
			toast.addEventListener('keyup', () => {
				socket.emit(
					'searchUser',
					document.getElementById('username').value
				)
				socket.on('possibleUser', (data) => {
					document.querySelector('.possibleUsers').innerHTML = ''
					showUser(data)
				})
			})
		},

		preConfirm: () => {
			return [
				document.getElementById('username').value,
				document.getElementById('id').value
			]
		}
	})

	if (
		formValues &&
		document.querySelector('.findMember').innerHTML == 'Search User'
	) {
		console.log(formValues)
		changeRoom(
			parseInt(document.getElementById('id').value),
			document.getElementById('username').value,
			'private'
		)
	}
	if (
		formValues &&
		document.querySelector('.findMember').innerHTML == 'Add User'
	) {
		socket.emit('addMember', formValues[1], formValues[0], currentRoom)
		/* addUser(
				parseInt(document.getElementById('id').value),
				document.getElementById('username').value,
				'private'
			) */
	}
	return
})

//Create Group
document.querySelector('.newGroup').addEventListener('click', async () => {
	const { value: formValues } = await Swal.fire({
		toast: true,
		title: 'New Group Info',
		showCancelButton: true,
		confirmButtonText: 'Create',
		background: '#695cfe',
		html:
			'<div class="possibleUsers"></div>' +
			'<input id="groupname" class="swal2-input" placeholder="Group Name(Maximum characters 50)">' +
			'<input id="username" class="swal2-input" placeholder="Username">' +
			'<input id="id" class="swal2-input" placeholder="ID">',

		didOpen: (toast) => {
			toast.addEventListener('keyup', () => {
				socket.emit(
					'searchUser',
					document.getElementById('username').value
				)
				socket.on('possibleUser', (data) => {
					document.querySelector('.possibleUsers').innerHTML = ''
					showUser(data)
				})
			})
		},

		preConfirm: () => {
			return [
				document.getElementById('groupname').value,
				document.getElementById('username').value,
				document.getElementById('id').value
			]
		}
	})

	if (formValues) {
		createGroup(formValues[0], formValues[1], formValues[2])
	}
	return
})

//Create group
function createGroup(groupName, username, userID) {
	socket.emit('createGroup', groupName, username, userID)
	socket.on('refreshGroup', () => {
		socket.emit('getGroupData')
	})
	socket.on('redirectUserToNewGroup', (chatroomID, chatroomName, roomProperties)=> {
		changeRoom(chatroomID, chatroomName, roomProperties)
	})
	return
}

//message notification
socket.on('messageNotification', (chatroomName) => {
	console.log('found')
	const chatrooms = document.querySelectorAll('#chatList > li')
	for (chatroom of chatrooms) {
		if (chatroom.innerHTML == chatroomName) {
			console.log('found')
		}
	}

	/* if (currentRoom == chatroomID) {
		if (document.querySelector('#chatList').innerHTML == chatroomName){
			
		}
	} */
	return
})
