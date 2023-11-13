# congenial-bassoon

## Introduction

This is an API for real estate auction application that allows users to create property adverts and bid on them [here](https://congenial-basson.onrender.com/api/v1).

This api was developed using

- NodeJs (LTS version 18.3.0)
- KnesJS | ObjectionJS
- PostgresSQL
- InversifyJS | TypeScript

## Getting Started

### Prerequisites

The tools listed below are needed to run this application locally:

- Node (LTS Version)
- Npm v8.3.1 or above
- Docker (easier but optional) or PostgreSQL installed locally

You can check the Node.js and npm versions by running the following commands.

### Check node.js version

`node -v`

### Check npm version

`npm -v`

## Installation/setup

- Install project dependencies by running `npm install`.

- If you have docker installed and running, open a new terminal and run
  ```shell
    docker run --name postgres15 -p 5432:5432 -e POSTGRES_USER={{username}} -e POSTGRES_PASSWORD={{password}} -d postgres:15-alpine
  ```
  to spin a postgres container. Then run the following command to create a new database
  ```shell
    docker exec -it postgres15 createdb --username={{username}} --owner={{username}} foodcourt
  ```
- Incase you are NOT using docker, please ensure you have postgres up and running on port 5432 (or any port really) on your device and your connection details ( host, user, password etc), and ensure you ha
- In the root directory of your project create a `.env` file and populate it with the following details:
  ```env
    JWT_SECRET=secretkey
    DB_NAME=bridge_dev
    DB_HOST=localhost
    DB_PASSWORD={{your postgres password (or the password value you provided if you used the docker approach)}}
    DB_PORT=5432 or {{your configured postgres port }}
    DB_USER={{you postgres user (or the username value you provided if you used the docker approach)}}
  ```
- Run `npm run dev` to start the development server and watch for changes.

- Access endpoints on localhost:3000 using any api client of your choice (e.g Postman, Insominia etc).

## Run migration

This can be done before or after successfully starting the development server.

- First, open a new terminal and navigate to your projects root directory.

- Then run `npm run migrateup` to execute the database migrations.
- For convinience, some seed data has been provided for database seeding. Run `npm run seed` to seed in some data to the database (follow ).

# Database Diagram



# REST API

The REST API to the _bridge app_ is described below.
The base URL for local development is

    http://localhost:3000/

The base URL for the live version is

    https://congenial-basson.onrender.com/

POST `/users`: Create a new user:

Example request
```json

{
  "name": "Dotcom",
  "role": "P_TENANT", //P_TENANT | LANDLORD
  "email": "bankersurate+01@gmail.com"
}

```


GET `/:user_id`: Retrieve a user by ID.

> Adverts `/adverts`

POST `/adverts`: Create an advert.

Example request
```json
{
  "name": "Villa",
  "address": {
    "name": "Earth",
    "coordinates": [9.8687, 7.4738]
  },
  "price": 500,
  "user_id": "ad2da7cd-ffd2-4902-a2f5-2166ec6e48e8",
  "noOfRooms": 3
}
```

GET `/adverts`: Retrives all adverts

GET `/adverts/:advert_id`: Retrives an advert by id along with its bids


> Bid `/bids`

POST `/bids`: Creates a new bid

GET `/bids/:bid_id`: Retrives a placed bid.

PUT `/bids/accept`: Accepts a bid. This initiates a transaction if the user has enough funds and then close the advert.

> transactions `/transactions`

GET `/transactions/:user_id`: Retrieves all the transactions belonging to the user.

For convienience, 2 users cuurently exist as part of the seed data

```javascript
    { id: 1, name: 'Wing Kings' },
    { id: 2, name: 'Frankies' },
    { id: 3, name: 'FC Shop' },
```

use any of these 3 brand id's when testing out the API.


## Swagger documentation

[Click here to get the swagger documentation](https://congenial-basson.onrender.com/docs/swagger)


#### Deployed Link

You can [click here](https://congenial-basson.onrender.com/) to test the api