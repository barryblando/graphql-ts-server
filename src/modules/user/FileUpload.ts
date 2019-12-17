// import { Upload } from '../../types/Upload'
import { Resolver, Mutation, Arg } from 'type-graphql'
import { GraphQLUpload, FileUpload } from 'graphql-upload'
import path from 'path'
import { createWriteStream } from 'fs'
// import shortid from 'shortid'

@Resolver()
export class FileUploadResolver {
	// @Mutation(() => Boolean)
	// async singleUpload(@Arg('file', () => GraphQLUpload) { createReadStream, filename }: Upload): Promise<boolean> {
	// 	// const destinationPath = path.join(os.tmpdir(), filename)
	// 	return await new Promise((resolve, reject) =>
	// 		createReadStream()
	// 			.pipe(createWriteStream(path.join(__dirname, '../../../images', filename)))
	// 			.on('error', () => reject(false))
	// 			.on('close', () => resolve(true)),
	// 	)
	// }

	@Mutation(() => [Boolean])
	async fileUpload(@Arg('files', () => GraphQLUpload) files: FileUpload): Promise<boolean[]> {
		let readableStreams: FileUpload[] = []
		if (Array.isArray(files)) {
			readableStreams = await Promise.all(files)
			console.log(readableStreams)
		} else {
			readableStreams[0] = files
		}

		const pipeStreams = readableStreams.map(async readStreamInstance => {
			const { filename, createReadStream } = readStreamInstance
			const writableStream = createWriteStream(path.join(__dirname, '../../../images', filename), { autoClose: true })
			return await new Promise<boolean>((resolve, reject) =>
				createReadStream()
					.pipe(writableStream)
					.on('error', () => reject(false))
					.on('finish', () => resolve(true)),
			)
		})

		return await Promise.all(pipeStreams)
	}
}
