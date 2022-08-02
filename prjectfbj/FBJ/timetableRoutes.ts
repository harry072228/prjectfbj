import express from 'express'
// import fs from 'fs'
import client from './postgres'
export const timetableRouter = express.Router()

timetableRouter.post('/timetable', async (req, res) => {
	console.log(req.body)
	let meetingTopic = req.body.topic
	let timeObject = req.body.clock
	let departmentObject = req.body.department
	let date = req.body.date
	console.log(date)
	console.log(meetingTopic)
	console.log(timeObject)
	console.log(departmentObject)

	{
		try {
			await client.query(
				'INSERT INTO timetable(date,topic, clock,department, created_at, updated_at) VALUES($1, $2,$3,$4, NOW(), NOW() )',
				[date, meetingTopic, timeObject, departmentObject]
			)
			res.json("hi")
		} catch (err) {
			console.log(err)
			res.status(500).send('Internal Server Error')
			return
		}
	}
})

timetableRouter.get('/timetable', async (req, res) => {
	try {
		const result = await client.query('SELECT * from timetable')

		let data = result.rows
		res.json(data)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
		return
	}
})

timetableRouter.delete('/timetable', async (req, res) => {
	try{const date = req.query.date

	await client.query('delete from timetable where date= $1', [date])

	res.json()}
    catch(err){
    console.log(err)
    	res.status(500).send('Internal Server Error')
		return
};
    
})
