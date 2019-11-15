# GraphQL TS Server

Steps to run this repo:

1. Run `yarn install` command
2. Setup database settings inside `ormConfig.ts` file
3. Run `yarn start` command

## Schema or Code First

- Before using this Boilerplate it is recommended that you know Schema-First GraphQL Development
- Type-GraphQL lies on Code First while Prisma on Schema-First

## Create & Access DB (PostgreSQL Windows)

- **Windows**

  ```cmd
  createdb -h localhost -p 5432 -U postgres [dbName]

  then...

  psql -h localhost -p 5432 -U postgres -d [dbName] or if you want to login to postgres first: psql -U postgres then enter password
  ```

- **Ubuntu WSL**

  - [Getting Started With PostgreSQL 11 on Ubuntu 18.04](https://pgdash.io/blog/postgres-11-getting-started.html)
  - [Create and drop roles in PostgreSQL](https://support.rackspace.com/how-to/postgresql-creating-and-dropping-roles/)

## To be Implemented

- Register
- Validation
- Login
- Authorization/Middleware
- JWT Authentication
- Confirmation Email
- Forgot/Change Password
- Logout
- Test
- Rate Limiting
- Locking Accounts
- Higher Order Resolver

## Sources

- [The Problems of "Schema-First" GraphQL Server Development](https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3)
