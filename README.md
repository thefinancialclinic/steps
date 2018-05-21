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

We're using typeorm to manage the database.
You will need postgres along with its command line tools (part of normal install).
The provided config assumes a postgres user `postgres` with a blank password.

### Test/Dev Config

```
createdb steps_admin_test
NODE_ENV=test $(npm bin)/ts-node $(npm bin)/typeorm migration:run -c test
```

You should see many lines of DB output ending with something containing the word `COMMIT`.
If you see the commit message, it means migrations have run.

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
