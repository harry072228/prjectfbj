import express from 'express'
// import fs from 'fs'
import client from './postgres'
export const kanbanListRouter = express.Router()

kanbanListRouter.post('/kanbanItem/:id', async (req, res) => {
	try {
		let item_name = req.body.item_name
		let kanban_id = req.params.id

		await client.query(
			`INSERT INTO kanban_item (kanban_id,item_name, created_at, updated_at,status) VALUES($1,$2, NOW(), NOW(),'active' )`,
			[kanban_id, item_name]
		)
		// let kanbanId = kanbanResult.rows[0].id
		// await client.query(
		// 	'INSERT INTO kanban_User(kanban_id,user_id,created_at, updated_at) VALUES($1,$2,NOW(),NOW())',
		// 	[kanbanId, userId]
		// )

		res.json('create kanbon success')
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})

kanbanListRouter.get('/kanbanItem/:id', async (req, res) => {
	try {
		let kanban_id = req.params.id
		const result = await client.query(
			`select * from kanban_item where kanban_id =$1 and status='active'`,
			[kanban_id]
		)

		let data = result.rows
		res.json(data)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})

kanbanListRouter.patch('/kanbanItem/:id', async (req, res) => {
	try {
		// console.log("patch");

		const kanban_item = req.params.id

		await client.query(
			`UPDATE kanban_item SET status = 'inactive' WHERE id =$1`,
			[kanban_item]
		)

		res.json()
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})

kanbanListRouter.post('/kanbanMember', async (req, res) => {
	try {
		let memberEmail = req.query.email
		// let memberEmail = '123@123'
		let kanbanId = req.query.id

		let userResult = await client.query(
			`select id from users where email =$1 `,
			[memberEmail]
		)

		if (userResult && userResult.rows[0]) {
			let userId = userResult.rows[0].id

			let kanbanUserResult = await client.query(
				`select * from kanban_user where user_id =$1 and kanban_id =$2`,
				[userId, kanbanId]
			)
			if (kanbanUserResult.rowCount < 1) {
				await client.query(
					'INSERT INTO kanban_User(kanban_id,user_id,created_at, updated_at) VALUES($1,$2,NOW(),NOW())',
					[kanbanId, userId]
				)
				res.json('success')
			} else {
				res.json('duplicate')
			}
		} else {
			res.json('no member')
		}
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})

kanbanListRouter.post('/kanbanContent', async (req, res) => {
	try {
		const { topic, content, time, itemid } = req.body

		await client.query(
			`INSERT INTO kanban_content (kanban_item_id,kanban_topic,kanban_content,kanban_deadline,created_at, updated_at,status) VALUES($1,$2,$3,$4, NOW(), NOW(),'active' )`,
			[itemid, topic, content, time]
		)
		res.json('success')
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})

kanbanListRouter.get('/kanbanContent/:id', async (req, res) => {
	try {
		let kanbanId = req.params.id
		let data = await client.query(
			`select kanban_content.id as listid,kanban_item_id,kanban_topic,kanban_content,kanban_deadline from kanban_content join kanban_item on kanban_item.id= kanban_content.kanban_item_id 
			
			where kanban_item.status ='active' and kanban_content.status ='active' and kanban_id=$1`,[kanbanId]
		)

		let result = data.rows

		res.json(result)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})

kanbanListRouter.patch('/kanbanContent/:id', async (req, res) => {
	try {
		
		const kanbanItem = req.params.id

		await client.query(`UPDATE kanban_content SET status = 'inactive' where id= $1`, [
			kanbanItem
		])

		res.json()
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})


kanbanListRouter.patch('/kanbanItem_id/:id', async (req, res) => {
	try {
		
		const kanbanContentId = req.params.id
		const kanbanItemId = req.query.id

		// console.log(kanbanContentId);
		// console.log(kanbanItemId);
		if( kanbanContentId!=="undefined" && kanbanItemId!=="undefined"){
			// console.log({kanbanContentId, kanbanItemId});
			
			await client.query(`UPDATE kanban_content SET kanban_item_id = $1 where id= $2`, [
				kanbanItemId,kanbanContentId	])

		}


	

		res.json()
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})

