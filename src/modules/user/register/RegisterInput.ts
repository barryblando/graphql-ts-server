import { InputType, Field } from 'type-graphql'
import { Length, IsEmail } from 'class-validator'
import { isEmailAlreadyExist } from './isEmailAlreadyExist'
import { PasswordMixin } from '../../shared/PasswordMixin'

// INFO: Here we create Input Type
@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
	@Field()
	@Length(1, 255)
	firstName: string

	@Field()
	@Length(1, 255)
	lastName: string

	@Field()
	@IsEmail()
	@isEmailAlreadyExist({ message: 'Email $value already exists.' })
	email: string
}
