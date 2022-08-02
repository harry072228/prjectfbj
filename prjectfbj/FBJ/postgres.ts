import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const client = new pg.Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
})

export default client
