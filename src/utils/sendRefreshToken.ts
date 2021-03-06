// res.cookie('jwt', token, {
// 	httpOnly: true, // so it can't be accessed by javascript xss attacks
//	secure: true, //on HTTPS
//	domain: 'example.com', // set your domain, if you want it to work w/ sub domain put '.example.com'
// `sub domain i.e api.example.com, www.example.com` - this is important if you're using using SSR (Next.js/Nuxt.js)
// })

export const sendRefreshToken = (res: any, token: string) => {
	res.cookie('jid', token, {
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //  match the expiration date use in the refresh token (7days)
		httpOnly: true,
		path: '/refresh_token',
	})
}
