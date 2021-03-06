# GraphQL TS Server Boilerplate

Steps to run this repo:

1. Run `yarn install` command
2. Setup database settings inside `ormconfig.ts` file
3. Setup .env

   ```env
   TYPEORM_HOST=
   TYPEORM_USERNAME=
   TYPEORM_PASSWORD=
   TYPEORM_DATABASE=
   DEBUG=true
   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=
   SESSION_SECRET=
   FRONTEND_URL=http://localhost:3000
   ```

4. Run `yarn start` command

## Schema or Code First

- Before using this Boilerplate it is recommended that you know Schema-First GraphQL Development
- Type-GraphQL lies on Code First while Prisma on Schema-First

## Why Type-GraphQL for SDL Development

1. You can use a single class for both a db model and graphql model
2. Way smoother to code (generating types is clunky)
3. The schema + resolver can be together in the same place

## Create & Access DB (PostgreSQL Windows)

- **Windows WSL**

  ```cmd
  createdb -h localhost -p 5432 -U postgres [dbName] or if you got a working postgresql functions just execute: createdb [dbName]

  then...

  sudo -u postgres psql, then...  \c [dbName]

  or

  psql -h localhost -p 5432 -U postgres -d [dbName] or if you want to login to postgres first: psql -U postgres then enter password
  ```

- **Ubuntu WSL Setup & PostgreSQL command guides**

  - [Getting Started with PostgreSQL](https://www.ntu.edu.sg/home/ehchua/programming/sql/PostgreSQL_GetStarted.html#zz-3.3)
  - [Getting Started With PostgreSQL 11 on Ubuntu 18.04](https://pgdash.io/blog/postgres-11-getting-started.html)
  - [Create and drop roles in PostgreSQL](https://support.rackspace.com/how-to/postgresql-creating-and-dropping-roles/)

## Implemented

- Register - Done
- Validation - Done
- Login - Done
- Authorization Roles - Done
- Authorization Middleware - Done
- Confirmation Email - Done
- Forgot/Change Password - Done
- Logout - Done
- Test Environment (ts-jest) - Done
- Pagination - Done
- Rate Limiting - Done
- Higher Order Resolver - 🏃
- File/Image Multi-upload - Done - [Minor Issues](https://github.com/MichalLytek/type-graphql/issues/37)
- Query Complexity - Done
- Time Performance GraphQL Resolver - 🏃
- Locking Accounts - 🏃
- JWT Authentication (Access/Refresh Tokens, Revoking) - Done

## Plans

- Will try to migrate to Rust

## Tests

```json
    // add this back if file upload won't work
    "resolutions": {
      "**/**/fs-capacitor": "^6.2.0",
      "**/graphql-upload": "^11.0.0"
    }
```

## Sources

- [The Problems of "Schema-First" GraphQL Server Development](https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3)
- [graphql-upload with cloudinary](https://support.cloudinary.com/hc/en-us/community/posts/360031762832-graphql-upload-with-cloudinary)
- [Fast and maintainable patterns for fetching from a database](https://sophiebits.com/2020/01/01/fast-maintainable-db-patterns.html)
