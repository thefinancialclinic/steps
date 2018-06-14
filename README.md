# About

There are two packages here for the STEPS bot:

* The API backend, an expressjs REST server connected to a PostgreSQL database
* A React frontend for the admin interface

We're using [lerna](https://lernajs.io/) to manage these two interrelated apps.

# Dependencies

* Node 8.11.3

# Local development

## Setup for local development

### DB config

We're using sqitch to manage the database migrations.
You will need postgres along with its command line tools (part of normal install).
The provided config assumes a postgres user `postgres` with a blank password.

```
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

If you see that, then the DB is ready to rock.

### Refresh with latest build

```
git checkout develop
git pull
npm install
$(npm bin)/lerna exec "npm install"
$(npm bin)/lerna bootstrap
sqitch deploy
```

### App Execute
Change directories to the project root (where this README is).
Provided that you've installed everything called for in [setup](#setup), run:

```
NODE_ENV=development npm start       # run packages in parallel
```

Now visit <http://localhost:3000>

## Testing

### Execute tests

In the root of the project (parent dir of `/apps`), run:

```
npm test
```

which should immediately run:
`$(npm bin)/lerna run test` and so in turn runs tests in each project.

# Authentication/Authorization

There are some environment variables that configure our [Auth0](https://auth0.com/)
integration. These are:

* AUTH0_CLIENT_ID
* AUTH0_ISSUER

These can be set at the command line or, more conveniently can be put in an
`.env` file:

_/apps/api/.env_
```
AUTH0_CLIENT_ID=<Auth0 Client ID>
AUTH0_ISSUER=<Auth0 Issuer>
```

If this `.env` file is successfully loaded, you should see the message,
_"Reading .env file..."_ on the command line when the application starts.
