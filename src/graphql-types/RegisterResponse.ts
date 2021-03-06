import { Field, ObjectType } from 'type-graphql'
import { User } from '../entity/User'
import { IResponse } from './interfaces/Response'

@ObjectType({ implements: IResponse })
export class RegisterResponse implements IResponse {
	user?: User | undefined

	@Field(() => String)
	messageId: string

	@Field(() => String)
	messageUrl: string | boolean
}
