import bcrypt from 'bcryptjs'
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'
import { ObjectType, Field, ID, Root, Authorized } from 'type-graphql'

// https://typeorm.io/#/entities
// INFO: Entity is a class that maps TypeScript code to a database table.
// INFO: BaseEntity allows as to access the underlying prototype methods provided by typeorm 'active record pattern' (i.e User.create|find)
// INFO: ObjectType allows us to create graphql object type from a class entity

enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER',
	ITEM_CREATE = 'ITEM_CREATE',
	ITEM_UPDATE = 'ITEM_UPDATE',
	ITEM_DELETE = 'ITEM_DELETE',
	PERMISSION_UPDATE = 'PERMISSION_UPDATE',
}

@ObjectType()
@Entity('users') // you can set alternative table name by doing @Entity("users")
export class User extends BaseEntity {
	@Field(type => ID) // Field allows us to expose this property of entity into graphql object schema
	@PrimaryGeneratedColumn('uuid')
	id: string

	// https://typeorm.io/#/entities/column-types-for-postgres

	@Field()
	@Column('varchar', { length: 128 })
	firstName: string

	@Field()
	@Column('varchar', { length: 128 })
	lastName: string

	@Field()
	@Column('text', { unique: true })
	email: string

	@Column('text') password: string

	@Authorized('ADMIN') // Only admin can query this field
	@Field(type => [String])
	@Column('enum', { enum: Roles, array: true, default: [Roles.USER] })
	roles: Roles[]

	@Column('boolean', { default: false }) confirmed: boolean

	@Column('boolean', { default: false }) locked: boolean

	@Column('int', { default: 0 })
	tokenVersion: number

	// We can also put a field w/o putting in on the database using column if it is a simple field to query for User
	// and when it comes to relational querying you may as well put this on a separate Resolver,
	// About query complexity let's say this field causes high workload we need set its complexity points so whenever users
	// query this field 3 times, 3 x 3 = 9, if the maximum query complexity points is 8 then we should minimize querying this field
	@Field({ complexity: 3 })
	name(@Root() parent: User): string {
		return `${parent.firstName} ${parent.lastName}`
	}

	// INFO: https://github.com/typeorm/typeorm/issues/1055
	// -> @OneToMany(target? => Child, child => child.parent)
	// @OneToMany(() => Post, post => post.user)
	// posts: Post[]

	@CreateDateColumn() createdAt: string
	@UpdateDateColumn() updatedAt: string

	hashPassword(password = ''): Promise<string> {
		return bcrypt.hash(password, 12)
	}

	comparePassword(password: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword)
	}

	@BeforeInsert()
	@BeforeUpdate()
	async savePassword(): Promise<void> {
		const hashedPassword = await this.hashPassword(this.password)
		this.password = hashedPassword
	}
}
