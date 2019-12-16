import { ObjectType } from 'type-graphql'
import { FieldError } from './FieldError'
import { User } from './../entity/User'
import { IResponse } from './interfaces/Response'

@ObjectType({ implements: IResponse })
export class LoginResponse implements IResponse {
	user?: User
	errors?: FieldError[]
	accessToken?: string
}
