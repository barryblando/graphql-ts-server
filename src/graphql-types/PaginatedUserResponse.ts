import { User } from './../entity/User'
import { PaginatedResponse } from './shared/PaginatedResponse'
import { ObjectType } from 'type-graphql'

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(User) {
	// we can freely add more fields or overwrite the existing one's types
	// @Field(type => [String])
	// otherInfo: string[]
}
