import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator'
import { User } from '../../../entity/User'

// INFO: This Validator constraint will be use in custom validator
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
	async validate(email: string) {
		const userExist = await User.findOne({ where: { email } })

		if (userExist) return false

		return true
	}
}

// INFO: Here we create custom validator using class-validator
export function isEmailAlreadyExist(validationOptions?: ValidationOptions) {
	return function(object: Object, propertyName: string) { // eslint-disable-line
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsEmailAlreadyExistConstraint,
		})
	}
}
