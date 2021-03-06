import { InputType, Field } from 'type-graphql'
import { passwordMixin } from '../../shared/PasswordMixin'

// INFO: Here we create Input Type
@InputType()
export class ChangePasswordInput extends passwordMixin(class {}) {
	@Field()
	token: string
}
