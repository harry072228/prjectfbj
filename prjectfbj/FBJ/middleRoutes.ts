import express from 'express'
import formidable from 'formidable'
import fs from 'fs'


export const isLogin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction	
) => {
	if (req.session['isUser']) {
		next()
	}else{
		res.redirect('/login')
	}
}

export const isAdmin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction	
) => {
	if (req.session['isAdmin']) {
		next()
	}else{
		res.redirect('/login')
	}
}



const uploadDir = 'uploads'
fs.mkdirSync('uploads', { recursive: true })

export const form = formidable({
	uploadDir: uploadDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 20 * 1024 * 1024 ** 2, // the default limit is 20MB
	filter: (part) => part.mimetype?.startsWith('image/') || false
})

