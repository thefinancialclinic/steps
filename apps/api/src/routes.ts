import { CoachController } from './controller/CoachController';
import { OrgController } from './controller/OrgController';
import { UserController } from './controller/UserController';
import { TaskController } from './controller/TaskController';
import { MessageController } from './controller/MessageController';
import { MediaController } from './controller/MediaController';
import { RequestController } from './controller/RequestController';
import { AuthController } from './controller/AuthController';
import * as middleware from './middleware';
import { Router } from 'express-serve-static-core';
import * as express from 'express';
import { ClientController } from './controller/ClientController';

require('dotenv').config({ path: '../../.env' });
const { AUTH0_ENABLED } = process.env;
const enableAuth0 = AUTH0_ENABLED === 'true';
const permit = middleware.permit;

const router: Router = express.Router();

// API-specific middleware
const authScheme = enableAuth0
  ? [
      middleware.checkJwt,
      middleware.bearerTokenAuthMiddleware,
      middleware.userIdAuthMiddleware,
    ]
  : [middleware.userIdAuthMiddleware];
router.use(authScheme);

// Clients
router
  .route('/clients')
  .get(ClientController.all)
  .post(ClientController.save);
router
  .route('/clients/:id')
  .get(ClientController.one)
  .put(ClientController.update)
  .delete(permit(['Superadmin', 'Admin', 'Coach']), ClientController.remove);
router.get('/clients/:id/tasks', ClientController.tasks);
router.get('/clients/:id/messages', ClientController.messages);
router.get('/clients/:id/viewed_media', ClientController.viewed_media);
router.get('/clients/:id/requests', ClientController.requests);
router
  .route('/clients/:id/viewed_media/:media_id')
  .post(ClientController.create_viewed_media)
  .delete(ClientController.delete_viewed_media);

// Coaches
router
  .route('/coaches')
  .get(CoachController.all)
  .post(permit(['Superadmin', 'Admin']), CoachController.save);
router
  .route('/coaches/:id')
  .get(CoachController.one)
  .delete(permit(['Superadmin', 'Admin']), CoachController.remove);

// // Orgs
router
  .route('/orgs')
  .get(OrgController.all)
  .post(permit('Superadmin'), OrgController.save);
router.delete('/orgs/:id', permit('Superadmin'), OrgController.remove);

// Users
router
  .route('/users')
  .get(UserController.all)
  .post(UserController.save);
router
  .route('/users/:id')
  .get(UserController.one)
  .delete(UserController.remove);

// Tasks
router
  .route('/tasks')
  .get(TaskController.all)
  .post(TaskController.save)
  .put(TaskController.updateMany);
router
  .route('/tasks/:id')
  .get(TaskController.one)
  .delete(TaskController.remove)
  .put(TaskController.update);

// Messages
router
  .route('/messages')
  .get(MessageController.all)
  .post(MessageController.save);
router
  .route('/messages/:id')
  .get(MessageController.one)
  .delete(MessageController.remove);

// Media
router
  .route('/media')
  .get(MediaController.all)
  .post(MediaController.save);
router
  .route('/media/:id')
  .get(MediaController.one)
  .delete(MediaController.remove);

// Requests
router
  .route('/requests')
  .get(RequestController.all)
  .post(RequestController.save);
router
  .route('/requests/:id')
  .get(RequestController.one)
  .put(RequestController.update)
  .delete(RequestController.remove);

export default router;
