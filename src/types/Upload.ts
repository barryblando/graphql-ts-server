import { Stream } from 'stream'

export interface IUpload {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: () => Stream
}
