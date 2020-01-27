## Install and start the backend for the first time
```sh
cd backend
npm install
npm run migrate
npm run seed
npm start
```

## Test accounts
```
Username: tester
password: password
```

```
Username: tester2
password: password
```

## Knex commands

There are different commands to run different functions to the database via Knex. All the command are excecuted in backend/ directory

### Make new migration file
To create a new migration file run `npm run make MIGRATION_NAME` 

### Migration
To migrate the database schema into the latest version run `npm run migrate` 

### Rollback
To rollback the database schema into earlier version run `npm run rollback` 


### Seed
To seed the database with users and highscores run `npm run seed`.
This creates 200 records in the scores table 
**Running this will reset all users and scores**