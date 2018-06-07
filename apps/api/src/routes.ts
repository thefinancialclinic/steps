import { ClientController } from './controller/ClientController';
import { CoachController } from './controller/CoachController';
import { OrgController } from './controller/OrgController';
import { UserController } from './controller/UserController';
import { TaskController } from './controller/TaskController';
import { StepController } from './controller/StepController';
import { MessageController } from './controller/MessageController';
import { MediaController } from './controller/MediaController';
import { RequestController } from './controller/RequestController';

export const Routes = [
  {
    method: 'get',
    route: '/api/clients',
    controller: ClientController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/clients/:id',
    controller: ClientController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/clients',
    controller: ClientController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/clients/:id',
    controller: ClientController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/api/coaches',
    controller: CoachController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/coaches/:id',
    controller: CoachController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/coaches',
    controller: CoachController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/coaches/:id',
    controller: CoachController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/api/orgs',
    controller: OrgController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/orgs/:id',
    controller: OrgController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/orgs',
    controller: OrgController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/orgs/:id',
    controller: OrgController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/api/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/users/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/users',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/users/:id',
    controller: UserController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/api/tasks',
    controller: TaskController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/tasks/:id',
    controller: TaskController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/tasks',
    controller: TaskController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/tasks/:id',
    controller: TaskController,
    action: 'remove',
  },
  {
    method: 'put',
    route: '/api/tasks/:id',
    controller: TaskController,
    action: 'update',
  },
  {
    method: 'get',
    route: '/api/steps',
    controller: StepController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/steps/:id',
    controller: StepController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/steps',
    controller: StepController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/steps/:id',
    controller: StepController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/api/messages',
    controller: MessageController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/messages/:id',
    controller: MessageController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/messages',
    controller: MessageController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/messages/:id',
    controller: MessageController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/api/media',
    controller: MediaController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/media/:id',
    controller: MediaController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/media',
    controller: MediaController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/media/:id',
    controller: MediaController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/api/requests',
    controller: RequestController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/requests/:id',
    controller: RequestController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/requests',
    controller: RequestController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/requests/:id',
    controller: RequestController,
    action: 'remove',
  },
];
