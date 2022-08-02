import express from 'express'
// import fs from 'fs'
import client from './postgres'
export const kanbanMainRouter = express.Router()

kanbanMainRouter.post('/kanban', async (req, res) => {
	try {
		let mainTopic = req.body.kanban_name

		// console.log(mainTopic)
		let userId = req.session['isUser'].id

		let kanbanResult = await client.query(
			`INSERT INTO kanban(kanban_name, created_at, updated_at,status) VALUES($1, NOW(), NOW(),'active' )RETURNING id`,
			[mainTopic]
		)
		let kanbanId = kanbanResult.rows[0].id
		await client.query(
			'INSERT INTO kanban_User(kanban_id,user_id,created_at, updated_at) VALUES($1,$2,NOW(),NOW())',
			[kanbanId, userId]
		)

		res.json('create kanbon success')
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})

kanbanMainRouter.get('/kanban', async (req, res) => {
	try {
		let userId = req.session['isUser'].id
		const result = await client.query(
			`select kanban_id,kanban_name  from kanban_user join kanban on kanban_user.kanban_id =kanban.id where user_id=$1 and status='active' order by kanban.updated_at desc`,
			[userId]
		)

		let data = result.rows
		res.json(data)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})

kanbanMainRouter.patch('/kanban/:id', async (req, res) => {
	
	
	try {
		// let userId = req.session['isUser'].id
		const kanbanMaindate = req.params.id

		await client.query(`UPDATE kanban SET status = 'inactive' where id= $1`, [
			kanbanMaindate
		])

		res.json()
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})
