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

### Adding a new DB migration

To add a new migration:

```
sqitch add --change <change name> --requires <previous migration> --note <comment>
```

- `<change name>` will become the file name of the migration
- `<previous migration>` is any migration required as a precondition for this migration
- `<comment>` describe the reason for the migration. This comment will be auditable later.

This creates three files:

- `apps/api/migration/deploy/<change name>.sql` The forward or "up" migration.
- `apps/api/migration/revert/<change name>.sql` Undoes the migration.
- `apps/api/migration/verify/<change name>.sql` Check that the migration was applied successfully.

Then deploy the migration with `sqitch deploy`.

Here is a real-world scenario:

```
sqitch add user_add_unique_email -n "[coach] Duplicate emails allowed for Coach and client objects, breaks auth." -r appschema
```

We use `-r appschema` or `--requires appschema` as a shortcut for run in the order of creation ensuring the DB exists.

### Refresh with latest build

```
git checkout develop
git pull
npm install
$(npm bin)/lerna exec "npm install"
$(npm bin)/lerna bootstrap
sqitch deploy
cp .env.example .env 
```

The last step will create an .env file with only the key names. Here is an example of the .env file with values filled in:

```
API_URL="http://localhost:3001/api"
AUTH0_AUDIENCE="http://steps-admin.herokuapp.com"
AUTH0_CLIENT_ID="<removed for security>"
AUTH0_DOMAIN="steps.auth0.com"
AUTH0_ENABLED=true
AUTH0_REDIRECT_URL="http://localhost:3000/authenticate"
AUTH0_MAGIC_LINK_REDIRECT_URL="http://localhost:3000/magic-link"
BOT_URL="https://mockbin.org/request"
NODE_ENV="development"
PORT="3001"
SENDGRID_API_KEY="<removed for security>"
SENDGRID_ENABLED=true
BASE_URL="http://localhost:3000"
AUTH0_SUPERADMIN_ID=<removed for security>
CYPRESS_AUTH0_BEARER_TOKEN="<removed for security"
```

### App Execute
Change directories to the project root (where this README is).
Provided that you've installed everything called for in [setup](#setup), run:

```
NODE_ENV=development npm start    # run packages in parallel
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

These can be set at the command line or, more conveniently can be put in the
`.env` file.

```
AUTH0_CLIENT_ID=<Auth0 Client ID>
AUTH0_ISSUER=<Auth0 Issuer>
```

If this `.env` file is successfully loaded, you should see the message,
_"Reading .env file..."_ on the command line when the application starts.

## Issuing a new Bot token

The chatbot application uses a long-lived [machine-to-machine token](https://auth0.com/blog/using-m2m-authorization/)
to access the API. (We issued a token valid for 100 days at launch—if you're reading this before October 17 2018, you're not too late). Here's how the machine to machine application is set up, and how to issue a new token manually before it expires:

The machine-to-machine application for the Hello Roo bot is configured under "Applications" on the Auth0 dashboard:

![Auth0 Applications dashboard](docs/applications-dashboard.png?raw=true "Auth0 Applications dashboard")

Click through to the app and you can select the APIs it's authorized to access:

![Hello Roo Bot application](docs/bot-application.png?raw=true "Hello Roo Bot application")

To issue a new token, select the "Hello Roo API" under the "APIs" section of the Auth0 dashboard:

![Auth0 APIs dashboard](docs/api-dashboard.png?raw=true "API dashboard")

The "Settings" tab will allow you to configure token expiration:

![Auth0 APIs dashboard settings tab](docs/settings-tab.png?raw=true "Auth0 APIs dashboard settings tab")

To get a new token by hand, visit the "Test" tab. Making the HTTP request shown there using a tool like [cURL](https://curl.haxx.se/) will return a new valid API token:

![Auth0 APIs dashboard test tab](docs/test-tab.png?raw=true "Auth0 APIs dashboard test tab")

Note that the bot can retrieve a new token at any time by issuing this request itself! That means the bot can automate the process of retrieving a new API token: check the [`exp`](https://auth0.com/docs/tokens/access-token) date in the current access token on a regular schedule, send an HTTP requsest to get a new one when it's getting old, and store and use the new token.

