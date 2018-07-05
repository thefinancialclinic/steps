import { expressJwtSecret } from 'jwks-rsa';
import { getUserFromAuthToken } from './services/Auth';
import * as jwt from 'express-jwt';

import { pool } from './db';
import { UserRepository } from './repository/UserRepository';

require('dotenv').config({ path: '../../.env' });

const { AUTH0_AUDIENCE, AUTH0_ISSUER } = process.env;
const userRepo = new UserRepository(pool);

// checkJwt : JWT -> req.token
const checkJwt = jwt({
  // Retrieve the signing key from the server
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${AUTH0_ISSUER}.well-known/jwks.json`,
  }),

  // Validate the audience of the issuer
  audience: AUTH0_AUDIENCE || 'http://steps-admin.herokuapp.com',
  issuer: AUTH0_ISSUER,
  algorithms: ['RS256'],
  complete: true,
  requestProperty: 'token',
});

// bearerTokenAuthMiddleware : req.token -> req.'x-userid'
const bearerTokenAuthMiddleware = userRepo => async (req, res, next) => {
  try {
    const user = await getUserFromAuthToken(req, userRepo);
    if (!user) {
      res.status(401);
      return res.send({ error: 'Unknown user, cannot auth' });
    }
    req.headers['x-userid'] = user.id;
    return next();
  } catch (err) {
    res.status(401);
    return res.send({ error: 'Unknown user, cannot auth' });
  }
};

// Consumes an 'X-UserId' header and, if valid and found in the db, adds the
// user to the request object
//
// userIdAuthMiddleware: req['X-UserId'] -> req.user
const userIdAuthMiddleware = (req, res, next) => {
  const userId = req.get('X-UserId');
  if (!userId) {
    res.status(403);
    return res.send({
      error: 'Forbidden',
    });
  }
  const userIdInt = parseInt(userId);
  if (!userIdInt) {
    res.status(400);
    return res.send({ error: 'Malformed auth header' });
  }

  userRepo
    .get({ id: userIdInt })
    .then(users => {
      req.user = users[0];
      next();
    })
    .catch(err => {
      res.status(404);
      return res.send({ error: 'Unknown user, cannot auth' });
    });
};

// Redirect HTTP requests to HTTPS
const httpsRedirect = (req, res, next) => {
  const { headers, hostname, originalUrl } = req;
  if (headers['x-forwarded-proto'] != 'https') {
    res.redirect(302, `https://${hostname}${originalUrl}`);
  } else {
    next();
  }
};

// Check if user's role is among the permitted roles
const permit = roles => {
  return (req, res, next) => {
    const userRole = req.user.type;
    if (roles.includes(userRole)) {
      return next();
    } else {
      return res.status(403).send({
        error: `User must be included in '${roles}', but role was '${userRole}'`,
      });
    }
  };
};

export {
  bearerTokenAuthMiddleware,
  checkJwt,
  httpsRedirect,
  permit,
  userIdAuthMiddleware,
};
