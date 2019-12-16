import { Response } from 'express'

// res.cookie('jwt', token, {
// 	httpOnly: true, // so it can't be accessed by javascript xss attacks
//	secure: true, //on HTTPS
//	domain: 'example.com', //set your domain
// })

export const sendRefreshToken = (res: Response, token: string) => {
	res.cookie('jid', token, {
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //  match the expiration date use in the refresh token (7days)
		httpOnly: true,
		path: '/refresh_token',
	})
}
