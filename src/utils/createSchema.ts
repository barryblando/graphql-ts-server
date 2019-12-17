import { FileUploadResolver } from '../modules/user/FileUpload'
import { buildSchema } from 'type-graphql'
import { authChecker } from './authChecker'
import { AdminResolver } from './../modules/admin/Admin'
import { ChangePasswordResolver } from './../modules/user/ChangePassword'
import { MeResolver } from './../modules/user/Me'
import { LogoutResolver } from './../modules/user/Logout'
import { LoginResolver } from './../modules/user/Login'
import { ForgotPasswordResolver } from './../modules/user/ForgotPassword'
import { ConfirmUserResolver } from './../modules/user/ConfirmUser'
import { RegisterResolver } from './../modules/user/Register'

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
		],
		// validate: true,
		authChecker,
	})
