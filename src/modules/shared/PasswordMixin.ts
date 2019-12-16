import { InputType, Field, ClassType } from 'type-graphql'
import { ValidationArguments, MinLength, MaxLength } from 'class-validator'
import { PasswordComplexity } from './PasswordComplexity'
import { passwordValidator } from '../../utils/passwordValidator'

// INFO: Here we create Input Type Mixins where we extend multiple input type classes

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
	@InputType({ isAbstract: true })
	class PasswordInput extends BaseClass {
		@Field()
		@MinLength(6)
		@MaxLength(12)
		@PasswordComplexity(
			{ upperCase: true, lowerCase: true, digit: true, specialCharacter: true },
			{
				message: (args: ValidationArguments) => {
					const { passed, message } = passwordValidator(args.constraints[0], args.value)

					if (!passed) {
						return message
					}

					// return no message
					return null
				},
			},
		)
		password: string
	}

	return PasswordInput
}
