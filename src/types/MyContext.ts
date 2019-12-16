import express from 'express'

interface Session {
	session?: {
		userId?: string
		destroy(callback: (err: any) => void): void
	}
}

interface Headers {
	headers?: { authorization?: string }
}

// interface to use for rate-limiting
interface IP {
	ip?: string
}

export interface MyContext {
	req: express.Request & Session & IP & Headers
	res: express.Response
	payload?: { userId: string }
}
