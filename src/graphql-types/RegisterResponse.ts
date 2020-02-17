import { Field, ObjectType } from 'type-graphql'
import { User } from '../entity/User'
import { IResponse } from './interfaces/Response'

@ObjectType({ implements: IResponse })
export class RegisterResponse implements IResponse {
	user?: User

	@Field(type => String)
	messageId: string

	@Field(type => String)
	messageUrl: string | boolean
}
