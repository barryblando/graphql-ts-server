import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Post } from './Post';

// https://typeorm.io/#/entities
@Entity() // you can set alternative table name by doing @Entity("Customer")
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid') id: string;

	// https://typeorm.io/#/entities/column-types-for-postgres

	@Column({ type: 'text', unique: true }) email: string;

	@Column({ type: 'varchar', length: '230' }) firstName: string;

	@Column({ type: 'int', nullable: true }) age: number;

	// INFO: https://github.com/typeorm/typeorm/issues/1055
	// -> @OneToMany(target? => Child, child => child.parent)
	@OneToMany(() => Post, post => post.user)
	posts: Post[];
}
