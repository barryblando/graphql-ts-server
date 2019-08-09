import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm'
import { User } from './User'

@Entity()
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: number

	@Column()
	title: string

	@Column()
	body: string

	@Column()
	published: boolean

	@Column({ name: 'author' })
	userId: string

	// Post is an owner of the relationship, and storages userId (author) on its own side.
	// -> @ManyToOne(target? => Parent, parent => parent.id)
	@ManyToOne(target => User, user => user.posts)
	user: User
}
