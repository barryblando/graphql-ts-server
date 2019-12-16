import { FieldError } from '../FieldError'
import { User } from '../../entity/User'
import { InterfaceType, Field } from 'type-graphql'

@InterfaceType()
export abstract class IResponse {
	@Field(() => User, { nullable: true })
	user?: User

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[]

	@Field({ nullable: true })
	accessToken?: string
}
