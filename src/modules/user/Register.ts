import { Resolver, Mutation, Arg, UseMiddleware } from 'type-graphql'
import { User } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'
import { rateLimit } from '../middleware/rateLimit'
import { sendEmail } from '../../utils/sendEmail'
import { createConfirmationUrl } from '../../utils/createConfirmationUrl'
import { RegisterResponse } from '../../graphql-types/RegisterResponse'

// Specifying User in Resolver parameter so we can know where this name field resolver are resolving for so its resolving for User
@Resolver()
export class RegisterResolver {
	// @FieldResolver()
	// async name(@Root() parent: User) {
	// 	return `${parent.firstName} ${parent.lastName}`
	// }

	@Mutation(returns => RegisterResponse, { description: 'Register reasonably', nullable: true })
	@UseMiddleware(rateLimit()) // add rate-limiting to prevent spamming, keep track of that person's ip
	async register(
		@Arg('data', { validate: true }) { firstName, lastName, email, password }: RegisterInput,
	): Promise<RegisterResponse> {
		// const hashedPassword = await bcrypt.hash(password, 12)
		let user: User
		let confirmationResponse

		try {
			user = await User.create({
				firstName,
				lastName,
				email,
				password,
			}).save()

			confirmationResponse = await sendEmail(email, await createConfirmationUrl(user.id))
		} catch (err) {
			console.log(err)
		}

		return { user, ...confirmationResponse }
	}
}
