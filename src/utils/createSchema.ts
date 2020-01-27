import { buildSchema } from 'type-graphql'
import { FileUploadResolver } from '../modules/user/FileUpload'
import { authChecker } from './authChecker'
import { AdminResolver } from '../modules/admin/Admin'
import { ChangePasswordResolver } from '../modules/user/ChangePassword'
import { MeResolver } from '../modules/user/Me'
import { LogoutResolver } from '../modules/user/Logout'
import { LoginResolver } from '../modules/user/Login'
import { ForgotPasswordResolver } from '../modules/user/ForgotPassword'
import { ConfirmUserResolver } from '../modules/user/ConfirmUser'
import { RegisterResolver } from '../modules/user/Register'
import { HelloResolver } from '../modules/hello/Hello'

// Create Schema
export const createSchema = () =>
	buildSchema({
		// resolvers: [__dirname + '/../modules/*/*.ts'],
		resolvers: [
			RegisterResolver,
			ConfirmUserResolver,
			ForgotPasswordResolver,
			LoginResolver,
			ChangePasswordResolver,
			LogoutResolver,
			MeResolver,
			AdminResolver,
			FileUploadResolver,
			HelloResolver,
		],
		// validate: true,
		authChecker,
	})
