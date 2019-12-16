import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { PasswordConstraint } from '../../types/PasswordConstraint'
import { passwordValidator } from '../../utils/passwordValidator'

export function PasswordComplexity(property: PasswordConstraint, validationOptions?: ValidationOptions) {
	return function(object: Record<string, any>, propertyName: string) {
		registerDecorator({
			name: 'PasswordComplexity',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: string, args: ValidationArguments) {
					const { passed } = passwordValidator(args.constraints[0], value)
					if (!passed) return false
					// if password pass all complexity return true
					return true
				},
			},
		})
	}
}
