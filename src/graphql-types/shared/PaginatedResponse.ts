import { ClassType, Field, ObjectType, Int } from 'type-graphql'

export const PaginatedResponse = <TItem>(TItemClass: ClassType<TItem>) => {
	// `isAbstract` decorator option is mandatory to prevent registering in schema
	@ObjectType({ isAbstract: true })
	abstract class PaginatedResponseClass {
		@Field(type => [TItemClass])
		results: TItem[]

		@Field(type => Int)
		total: number

		@Field({ nullable: true })
		next?: string

		@Field({ nullable: true })
		previous?: string
	}
	return PaginatedResponseClass as ClassType // asserting it as ClassType for now, Bug TS 3.7.3 Compiler
}
