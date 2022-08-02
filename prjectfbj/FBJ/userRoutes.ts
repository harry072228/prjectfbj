import express from 'express'
import client from './postgres'
import fetch from 'cross-fetch'
import { hashPassword, checkPassword } from './hashRoutes'
import { form } from './middleRoutes'
import { logger } from './logger'
import { transporter } from './nodemailer'

export const userRouter = express.Router()
// export let exportUsername: string;

//CRUD

userRouter.get('/login/google',
	async (req: express.Request, res: express.Response) => {
		try {
			const accessToken = req.session?.['grant'].response.access_token

			const fetchRes = await fetch(
				'https://www.googleapis.com/oauth2/v2/userinfo',
				{
					method: 'get',
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				}
			)

			const result = await fetchRes.json()

			const users = (
				await client.query(
					`SELECT * FROM users WHERE users.username = $1`,
					[result.email]
				)
			).rows

			let user = users[0]

			let username = result.name || result.email

			if (!user) {
				// Create the user when the user does not exist
				user = (
					await client.query(
						`INSERT INTO users (username,password,created_at,updated_at) VALUES ($1,$2,NOW(),NOW()) RETURNING *`,
						[result.email, await hashPassword(result.email)]
					)
				).rows[0]
			} else {
				// Update the user when the user exists
				user = (
					await client.query(
						`UPDATE users SET username = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
						[result.email, user.id]
					)
				).rows[0]
			}

			if (req.session) {
				req.session['isAdmin'] = true
				req.session['isUser'] = user
				res.redirect('/main.html')
				console.log(`${username} logged in`)
				// exportUsername = username
				return
			}

			return res.redirect('/')
		} catch (err) {
			console.log(err)
			return res.redirect('/')
		}
	}
)

userRouter.post('/login', async (req, res) => {
	try {
		let username = req.body.username.trim()
		let password = req.body.password.trim()

		const result = await client.query(
			'SELECT * FROM users where username=$1',
			[username]
		)

		const userRecord = result.rows[0]

		if (result.rowCount === 0) {
			throw new Error('User not found')
		}

		if (
			!(
				req.body.username === userRecord.username &&
				(await checkPassword(password, userRecord.password))
			)
		) {
			throw new Error('User password miss-match')
		}

		

		// if (
		// 	!(
		// 		username === userRecord.username || (await checkPassword(password, userRecord.password))
		// 	)
		// ) {
		// 	throw new Error('Incorrect login credentials')
		// }

		req.session['isAdmin'] = true
		req.session['isUser'] = result.rows[0]

		res.json({ result: true, user: result.rows[0] })
	} catch (err) {
		logger.error(err)
		let map = {
			'User not found': 'username not found',
			'User password miss-match': 'password miss-match',
			'Incorrect login credentials': 'incorrect login credentials'
		}
		res.status(500).json({ result: false, msg: map[err.message] })
		return
	}
})

userRouter.post('/logout', async (req, res) => {
	try {
		delete req.session['isAdmin'],
			req.session['isUser'],
			res.json({ result: true })
	} catch (err) {
		logger.error(err)
		res.status(500).json({ result: false, msg: 'logout Error' })
		return
	}
})

userRouter.post('/register', (req, res) => {
	form.parse(req, async (err, fields, files) => {
		try {
			let username = !Array.isArray(fields.username)
				? fields.username.trim()
				: fields.username[0].trim()

			let password = !Array.isArray(fields.password)
				? fields.password.trim()
				: fields.password[0].trim()

			let email = !Array.isArray(fields.email)
				? fields.email.trim()
				: fields.email[0].trim()

			// check username uniqueness
			const result = await client.query(
				'SELECT * FROM users where username=$1 AND email=$2',
				[username, email]
			)

			if (result.rows.length > 0) {
				throw new Error('Username already exists')
			}

			if (result.rows.length > 0 && result.rows[0].email == email) {
				throw new Error('Email already exists')
			}

			if (!username || !password || !email) {
				throw new Error('Missing username, password or email')
			}

			// insert user

			try {
				let chatroomUser = await client.query(
					'INSERT INTO users(username, password, email, created_at, updated_at) VALUES($1, $2, $3, NOW(), NOW()) RETURNING *',
					[username, await hashPassword(password), email]
				)

				await client.query(
					`insert into chatroom_list (chatroom_name, history_id, user_id, chatroom_properties, created_at, updated_at) 
                    values ($1, 5, $2 ,'private', NOW(), NOW())`
					, [username, chatroomUser.rows[0].id]
				)


			} catch (err) {
				throw new Error('INSERT Error');
			}


			res.json({ result: true, user: result.rows[0] })


		} catch (err) {
			logger.error(err)
			let map = {
				'Username already exists': 'username already exists',
				"Email already exists": 'email already exists',
				'Missing username, password or email': 'missing username, password or email'
			}
			res.status(500).json({ result: false, msg: map[err.message] })
			return
		}
	})
})

userRouter.post('/forgot', async (req, res) => {
	try {
		let username = req.body.username.trim()
		let email = req.body.email.trim()

		const result = await client.query(
			'SELECT * FROM users where username=$1',
			[username]
		)
		if (result.rows.length === 0) {
			throw new Error('User not found')
		}

		if (result.rows[0].email !== email) {
			throw new Error('Email miss-match')
		}

		let user = result.rows[0]

		let token =
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15)

		await client.query(
			'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2',
			[await hashPassword(token), user.id]
		)

		transporter.sendMail({
			to: email,
			from: 'teckytestemail@gmail.com',
			subject: 'Password Reset',
			text: `Your new password is ${token}`
		})

		await client.query(
			'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2',
			[await hashPassword(token), user.id]
		)

		transporter.sendMail({
			to: email,
			from: "teckytestemail@gmail.com",
			subject: 'Password Reset',
			text: `Your new password is ${token}`
		})

		res.json({ result: true, user: user })

	} catch (err) {
		logger.error(err)
		let map = {
			'User not found': 'username not found'
			, "Email miss-match": 'email miss-match'
		}
		res.status(500).json({ result: false, msg: map[err.message] })
		return
	}
}
)
