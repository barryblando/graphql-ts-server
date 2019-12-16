import { ObjectType } from 'type-graphql'
import { User } from '../entity/User'
import { FieldError } from './FieldError'
import { IResponse } from './interfaces/Response'

@ObjectType({ implements: IResponse })
export class UserResponse implements IResponse {
	user?: User
	errors?: FieldError[]
	accessToken?: string
}
