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

# Running

Change directories to the project root (where this README is).
Provided that you've installed everything called for in [setup](#setup), run:

```
NODE_ENV=development npm start       # run packages in parallel
```

Now visit <http://localhost:3000>
