import { InputType, Field } from 'type-graphql'
import { PasswordMixin } from '../../shared/PasswordMixin'

// INFO: Here we create Input Type
@InputType()
export class ChangePasswordInput extends PasswordMixin(class {}) {
	@Field()
	token: string
}
