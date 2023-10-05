# Medi Score App

This is the project I have completed for the AireLogi - Medi Score Calculation tech test.

The main function is to calculate Medi-Scores in accordance with the data provided in the tech test requirements. In order to demonstrate this functionality I have written a simple app that displays patient observation data and medi-scores in a browser.

The concept of this app is a simulation of an interface that could be on a hospital ward or other care facility to enable the recording, retrieval and trending of observation data, with the aid of the Medi Score as a summary score for the patients in care.

The app is written in Javascript, using Node js, express, ejs to serve HTML pages, jest for unit tests. The data is stored and retrieved using mongoDB with mongoose.

## Requirements

The app will run locally in containers with docker compose and node for js scripts.

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/)

## Installation & Usage

Install Node and app dependancies

```
npm i
```

Generate databse seed data with

```
node ./mongo-seed/generateData.js
```

Build and run the app with

```
docker compose up -d --build
```

App should be available at:
http://localhost:3000

Units tests can be run with in non-container terminal with:

```
npm test
```

## Features / Pages

The main feature is a dashboard page that shows a list of all patients:<br>
http://localhost:3000/patients

It uses a colour coded system green-yellow-amber-red, to indicate a warning for high Medi-scores averaged over the last 12 hours, and also for when the latest Medi-score is significantly higher than the recent average.

There is also a form to add new observation records. <br>
http://localhost:3000/new-record

## Database

The data will not persist between each load of the app, it will be re-seeded from the seed-data.json. To stop the db from seeding on each build, and for the data to persist, the docker-compose.yml can be modified to the following to use volumes:

```
version: "3"
services:
  mongodb:
    image: mongo
    container_name: mongodb-container
    ports:
      - "27018:27017"
    volumes:
      - mongodb_data:/data/db
      - mongodb_config:/data/configdb
  medi-score-app:
    build:
      context: .
    depends_on:
      - mongodb
    ports:
      - "3000:3000"
  volumes:
  mongodb_data:
  mongodb_config:

```

This will allow any records added to the database using the fron-end form to persist between re-loads.

## Notes

The functions for calculating the Medi-Score are in ./utils/

Additional thoughts on the project, intepretation of the instructions, and todo-list for app and code improvements are in ./notes

Thanks for reading! Looking forwards to hearing feedback on this tech test.
