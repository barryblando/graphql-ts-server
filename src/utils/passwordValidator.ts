import { IPasswordConstraint } from '../types/PasswordConstraint'

export const passwordValidator = (
	constraint: IPasswordConstraint,
	value: string,
): { passed: boolean; message: string | null } => {
	// /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
	if (constraint.upperCase) {
		if (!/^(?=.*[A-Z])/.test(value)) {
			return {
				passed: false,
				message: 'must contain at least one uppercase letter from A-Z',
			}
		}
	}

	if (constraint.lowerCase) {
		if (!/^(?=.*[a-z])/.test(value)) {
			return {
				passed: false,
				message: 'must contain at least one lowercase letter from a-z',
			}
		}
	}

	if (constraint.digit) {
		if (!/^(?=.*\d)/.test(value)) {
			return {
				passed: false,
				message: 'must contain at least one digit from 0-9',
			}
		}
	}

	if (constraint.specialCharacter) {
		if (!/^(?=.*[!@#$%^&*])/.test(value)) {
			return {
				passed: false,
				message: 'must contain at least one special character',
			}
		}
	}

	return {
		passed: true,
		message: null,
	}
}
