import pg from 'pg'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
const client = new pg.Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
})

async function loginPgResult() {
	client.connect()
	console.log('loginPgResult')

	// if (fs.existsSync('pgResult.json')) {
	//   fs.writeFileSync('pgResult.json', '[]')
	// }
	// const users = JSON.parse(
	//   await fs.promises.readFile('pgResult.json', 'utf8')
	// )
	// await client.query(
	//   'INSERT INTO users (username,password) values ($1,$2)',
	//   [users.username, users.password]
	// )

	const result = await client.query(
		'SELECT username, pass_word from users' // query the database for all users，frontend可直接入pg；backend拎出來要經json暫存
	)

	console.log(result.rows[0])

	// for (let user of result.rows) {
	//   users.push(user)
	// }

	// await fs.promises.writeFile('pgResult.json', JSON.stringify(users))

	await client.end() // close connection with the database
}
loginPgResult()
