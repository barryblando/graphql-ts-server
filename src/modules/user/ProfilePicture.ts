import { Upload } from './../../types/Upload'
import { Resolver, Mutation, Arg } from 'type-graphql'
import { GraphQLUpload } from 'apollo-server-express'
// import shortid from 'shortid'
import { cloudinary } from '../../cloudinary'

@Resolver()
export class ProfilePictureResolver {
	@Mutation(() => Boolean)
	async addProfilePicture(
		@Arg('picture', () => GraphQLUpload) { createReadStream, filename }: Upload,
	): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const streamLoad = await cloudinary.v2.uploader.upload(filename, function(error: any, result: any) {
					if (result) {
						console.log(result)
						resolve(result)
					} else {
						console.log(error)
						reject(error)
					}
				})

				await createReadStream()
					.pipe(streamLoad)
					.on('finish', () => resolve(true))
					.on('error', () => reject(false))
			} catch (err) {
				throw new Error(`Failed to upload profile picture ! Err:${err.message}`)
			}
		})
	}
}
