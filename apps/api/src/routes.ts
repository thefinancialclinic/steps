import { ClientController } from './controller/ClientController';
import { CoachController } from './controller/CoachController';
import { OrgController } from './controller/OrgController';
import { UserController } from './controller/UserController';
import { TaskController } from './controller/TaskController';
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
    method: 'get',
    route: '/api/clients/:id/tasks',
    controller: ClientController,
    action: 'tasks',
  },
  {
    method: 'get',
    route: '/api/clients/:id/messages',
    controller: ClientController,
    action: 'messages',
  },
  {
    method: 'get',
    route: '/api/clients/:id/viewed_media',
    controller: ClientController,
    action: 'viewed_media',
  },
  {
    method: 'get',
    route: '/api/clients/:id/requests',
    controller: ClientController,
    action: 'requests',
  },
  {
    method: 'post',
    route: '/api/clients/:id/viewed_media/:media_id',
    controller: ClientController,
    action: 'create_viewed_media',
  },
  {
    method: 'delete',
    route: '/api/clients/:id/viewed_media/:media_id',
    controller: ClientController,
    action: 'delete_viewed_media',
  },
  {
    method: 'post',
    route: '/api/clients',
    controller: ClientController,
    action: 'save',
  },
  {
    method: 'put',
    route: '/api/clients/:id',
    controller: ClientController,
    action: 'update',
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
    method: 'put',
    route: '/api/requests/:id',
    controller: RequestController,
    action: 'update',
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
