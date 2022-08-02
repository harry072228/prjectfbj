import express from 'express'
import client from './postgres'

export const chartRouter = express.Router()

chartRouter.get('/employeeData', async (res, req) => {
	try {
		const result = await client.query(
			//向server請求以下資料
			'SELECT username,personal_turnover,age from users where personal_turnover is not null' // query the database for all users，frontend可直接入pg；backend拎出來要經json暫存
		)
		req.json(result.rows)
	} catch (error) {
		console.log(error)
	}
})

chartRouter.get('/departmentData', async (res, req) => {
	try {
	const result = await client.query(
		'select department_name,department_turnover from department'
	)
	req.json(result.rows)}
	catch(error){
		console.log(error)
	}
})

chartRouter.get('/chatroomList', async (res, req) => {
	try {
	const result = await client.query(
		//向server請求以下資料
		'SELECT username,salary from users' // query the database for all users，frontend可直接入pg；backend拎出來要經json暫存
	)
	req.json(result.rows)
	} catch (error) {
		console.log(error)
	}
})
