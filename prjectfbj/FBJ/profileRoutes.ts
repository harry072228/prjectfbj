import express from 'express'
import { form } from './middleRoutes';
import client from "./postgres";
import { logger } from './logger';
import { hashPassword } from './hashRoutes';


export const profileRouter = express.Router()



profileRouter.post('/profileUpdate', async (req, res) => {
    form.parse(req, async (err, fields, files) => {

        try {


            let currentUsername = req.session['isUser' || 'isAdmin'].username


            let newUsername = !Array.isArray(fields.username)
                ? fields.username.trim() : fields.username[0].trim()
            let newPassword = !Array.isArray(fields.password)
                ? fields.password.trim() : fields.password[0].trim()


            let result = await client.query(
                'SELECT * FROM users where username=$1', [newUsername]
            )

            if (result.rows.length > 0) {
                throw new Error("Duplicate Username");
            }



            await client.query(
                `UPDATE chatroom_list SET chatroom_name = $1 WHERE chatroom_name = $2`
                ,[newUsername, currentUsername]
            )


            result = await client.query(
                "UPDATE users SET username = $1, password = $2 WHERE username = $3",
                [newUsername, await hashPassword(newPassword), currentUsername]

            )


            




            req.session['isUser'].username = newUsername
            req.session['isUser'].password = newPassword
            res.json({ result: true, message: "Update Success" })

        }
        catch (err) {
            logger.error(err)
            let map = {
                'Duplicate Username': 'Username already exists',
            }

            res.status(500).json({ result: false, msg: map[err.message] })
            return
        }
    })
})

profileRouter.post('/profileUpdateIcon', async (req, res) => {
    form.parse(req, async (err, fields, files) => {
        

        try {

            let username = req.session['isUser' || 'isAdmin'].username

            let photo = files.photo != null && !Array.isArray(files.photo) ? files.photo.newFilename : null

            

            await client.query('UPDATE users SET profile_pic = $1 WHERE username = $2', [photo, username])
            res.json({ result: true, message: "Update Profile Picture Success" })


            // let photoId = result.rows[0].id

        }
        catch (err) {
            logger.error(err)
            res.status(500).json({ result: false, msg: err })
            return
        }
    })
})

profileRouter.get('/getIcon', async (req, res) => {
    try{
        let photo = await client.query('SELECT id,profile_pic FROM users WHERE username = $1', 
        [req.session['isUser'].username])

        let photoResult = photo.rows[0]

        res.json({ result: true, photoResult})
    }
    catch(err){
        logger.error(err)
        res.status(500).json({ result: false, msg: err })
        return
    }
})

profileRouter.post('/profileUpdateBackground', async (req, res) => {
    form.parse(req, async (err, fields, files) => {
        

        try {

            let username = req.session['isUser' || 'isAdmin'].username

            let photo = files.photo != null && !Array.isArray(files.photo) ? files.photo.newFilename : null

            await client.query('UPDATE users SET profile_background = $1 WHERE username = $2', [photo, username])
            res.json({ result: true, message: "Update Profile Background Success" })


        }
        catch (err) {
            logger.error(err)
            res.status(500).json({ result: false, msg: err })
            return
        }
    })
})

profileRouter.get('/getBackground', async (req, res) => {
    try{
        let photo = await client.query('SELECT id,profile_background FROM users WHERE username = $1', 
        [req.session['isUser'].username])

        let photoResult = photo.rows[0]

        res.json({ result: true, photoResult})
    }
    catch(err){
        logger.error(err)
        res.status(500).json({ result: false, msg: err })
        return
    }
})

profileRouter.get('/user', async (req, res) => {
    try{

        let keyword = req.query.keyword 
        
        if (keyword) {
            const result = await client.query(`SELECT * FROM users WHERE username ILIKE $1 order by updated_at desc`,
             ['%' + keyword + '%'])
            res.json({ result: result.rows })

        }else{
            const result = await client.query(`SELECT * from users where status = 'active' order by updated_at desc`)
            res.json({ result: result.rows})
        }
        
    }
    catch(err){
        logger.error(err)
        res.status(500).json({ result: false, msg: err })
        return
    }
}
) 

profileRouter.get('/getUsername', async (req, res) => {

    
    try{
        let username = req.session['isUser' || 'isAdmin'].username

        let user = await client.query(`SELECT * FROM users WHERE username = $1`, 
        [username])

        let userResult = user.rows[0]
        
        res.json({ result: true, userResult})
    }
    catch(err){
        logger.error(err)
        res.status(500).json({ result: false, msg: err })
        return
    }
}
)

profileRouter.patch('/user/:id', async (req, res) => {
        
    try{
        let delUserId = req.params.id
        // console.log(delUserId)
        await client.query(`UPDATE users SET status = 'inactive' WHERE id = $1`,
         [delUserId])
         
        res.json()
    }
        catch(err){
            logger.error(err)
            res.status(500).json({ result: false, msg: err })
            return
        }
    })
    







// profileRouter.get('/getUser', async (req, res) => {
//     try{
        
//         const result = await client.query(`SELECT * from users where status = 'active' order by updated_at desc`,
//         )

//         res.json({ result: result.rows})
//     }
//     catch(err){
//         logger.error(err)
//         res.status(500).json({ result: false, msg: err })
//         return
//     }
// }
// ) 

// profileRouter.patch('/patchUser', async (req, res) => {
        
//     try{
//         let delUserId = req.body.delUserId
//         console.log(delUserId)
//         await client.query(`UPDATE users SET status = 'inactive' WHERE id = $1`,
//          [delUserId])
         
//         res.json()
//     }
//         catch(err){
//             logger.error(err)
//             res.status(500).json({ result: false, msg: err })
//             return
//         }
//     })