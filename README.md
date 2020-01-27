# Highscore webapp

## Description

### Frontend
The frontend is made with Vue.js and it utilizes Vuetify for UI components. API calls are made via Axios.

The app features a list of highscores. The list is sortable by points and user can add new highscores to the list. 
The highscore table component is selfmade. I could have just used a premade datatable component from Vuetify, but for this case it felt like a better option to do it myself.

### Backend
The backend uses Koa.js, Knex.js and Objection.js. Knex is set to use sqlite3 as development database.

- Database has users with scoretables. Scoretables have users scores. 
- Only authenticated users can access /score routes. /auth/login is public route


 


## Run the app

In order to run the app you need to first have Node.js and npm installed. **In order to have some accounts in the database you have to run the seed command when starting the app for the first time!**

## Clone the repo
```sh
git clone git@github.com:vilkarja/scores.git
```

## Install and start the backend for the first time
```sh
cd backend
npm install
npm run migrate
npm run seed
npm start
```

## Install and start the frontend
```sh
cd frontend
npm install
npm run serve
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