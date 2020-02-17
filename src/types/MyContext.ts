import express from 'express'

interface Session {
	session?: {
		userId?: number
		destroy(callback: (err: any) => void): void
	}
}

interface Headers {
	headers?: {
		[propName: string]: any
		authorization?: string
	}
}

// interface to use for rate-limiting
interface IP {
	ip?: string
}

export interface MyContext {
	req: express.Request & Session & IP & Headers
	res: express.Response
	payload: { userId: number }
}
