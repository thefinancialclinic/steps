# About

There are two packages here for the STEPS bot:

- The API backend, an expressjs REST server connected to a PostgreSQL database
- A React frontend for the admin interface

We're using [lerna](https://lernajs.io/) to manage these two interrelated apps.

# Setup

```
npm install
$(npm bin)/lerna bootstrap
```

## API Setup

We're using sqitch to manage the database migrations.
You will need postgres along with its command line tools (part of normal install).
The provided config assumes a postgres user `postgres` with a blank password.

### Test/Dev Config

```
cd apps/api
brew tap theory/sqitch
brew install sqitch_pg
createdb steps_admin_test
sqitch deploy
```

You should see something similar to:

```
Deploying changes to steps
  + appschema .. ok
```

If you see that the DB is ready to rock.

# Running

Change directories to the project root (where this README is).
Provided that you've installed everything called for in [setup](#setup), run:

```
NODE_ENV=development npm start       # run packages in parallel
```

Now visit <http://localhost:3000>

# Testing

In the root of the project (parent dir of `/apps`), run:

```
npm test
```

which should immediately run:
`$(npm bin)/lerna run test` and so in turn runs tests in each project.
