import express from 'express'

interface ISession {
	session?: {
		userId?: number
		destroy(callback: (err: any) => void): void
	}
}

interface IHeaders {
	headers?: {
		[propName: string]: any
		authorization?: string
	}
}

// interface to use for rate-limiting
interface IP {
	ip?: string
}

export interface IContext {
	req: express.Request & ISession & IP & IHeaders
	res: express.Response
	payload: { userId: number; tokenVersion?: number }
}
