import {
  MediaId,
  MediaRepository,
  Media,
} from '../src/repository/MediaRepository';
import { Org, OrgId, OrgRepository } from '../src/repository/OrgRepository';
import { Pool } from 'pg';
import {
  RequestRepository,
  RequestId,
  RequestItem,
} from '../src/repository/RequestRepository';
import { TaskId, TaskRepository, Task } from '../src/repository/TaskRepository';
import { UserId, UserRepository, User } from '../src/repository/UserRepository';

let pool: Pool;

let fixtures: {
  media: Media;
  org: Org;
  request: RequestItem;
  task: Task;
  user: User;
};

const getTestConnectionPool = async (options?: { createFixtures: boolean }) => {
  if (!pool) {
    pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'steps_admin_test',
      password: '',
      port: 5432,
    });
  }

  // create DB fixtures if requested
  if (options.createFixtures) {
    let media: Media;
    let org: Org;
    let request: RequestItem;
    let task: Task;
    let user: User;

    let res: any;

    // Org
    org = (await new OrgRepository(pool).getAll())[0];
    if (!org) {
      org = await new OrgRepository(pool).save(
        new Org({
          name: 'NAME',
          sms_number: 'SMS_NUMBER',
          logo: 'LOGO',
        }),
      );
    }

    // User
    user = (await new UserRepository(pool).get())[0];
    if (!user) {
      user = await new UserRepository(pool).save({
        first_name: 'FIRST',
        last_name: 'LAST',
        email: `EMAIL+${new Date().getTime()}@EXAMPLE.COM`,
        phone: 'PHONE',
        org_id: org.id,
        color: 'COLOR',
        goals: ['walk', 'run'],
        status: 'AWAITING_HELP',
        type: 'Client',
        platform: 'SMS',
        follow_up_date: new Date(),
        checkin_times: [],
      });
    }

    // Task
    task = (await new TaskRepository(pool).getAll())[0];
    if (!task) {
      task = await new TaskRepository(pool).save(
        new Task({
          title: 'TITLE',
          category: 'CATEGORY',
          description: 'DESCRIPTION',
          status: 'ACTIVE',
          created_by: org.id,
          user_id: user.id,
          difficulty: 'EASY',
          date_created: new Date(),
          date_completed: new Date(),
          order: 2,
        }),
      );
    }

    // Request
    request = (await new RequestRepository(pool).getAll())[0];
    if (!request) {
      request = await new RequestRepository(pool).save(
        new RequestItem({
          status: 'NEEDS_ASSISTANCE',
          user_id: user.id,
          task_id: task.id,
        }),
      );
    }

    // Media
    media = (await new MediaRepository(pool).getAll())[0];
    if (!media) {
      media = await new MediaRepository(pool).save(
        new Media({
          task_id: task.id,
          title: 'TITLE',
          category: 'CATEGORY',
          description: 'DESCRIPTION',
          url: 'URL',
          image: 'IMAGE',
          published_by: org.id,
          type: 'GENERAL_EDUCATION',
        }),
      );
    }

    // export created fixtures
    fixtures = {
      media,
      org,
      request,
      task,
      user,
    };
  } // end if(options.createFixtures)

  return pool;
};

export { getTestConnectionPool, fixtures, Pool };
