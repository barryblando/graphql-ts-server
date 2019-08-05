# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormConfig.ts` file
3. Run `npm start` command

## Create & Access DB (PostgreSQL Windows)

```cmd
    createdb -h localhost -p 5432 -U postgres [dbName]

    then...

    psql -h localhost -p 5432 -U postgres -d [dbName]
```
