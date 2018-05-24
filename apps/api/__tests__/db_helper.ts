import {
  MediaId,
  MediaRepository,
  Media
} from "../src/repository/MediaRepository";
import { Org, OrgId, OrgRepository } from "../src/repository/OrgRepository";
import { Pool } from "pg";
import {
  RequestRepository,
  RequestId,
  Request
} from "../src/repository/RequestRepository";
import { StepId, StepRepository, Step } from "../src/repository/StepRepository";
import { TaskId, TaskRepository, Task } from "../src/repository/TaskRepository";
import { UserId, UserRepository, User } from "../src/repository/UserRepository";

let pool: Pool;

let fixtures: {
  media: MediaId;
  org: OrgId;
  request: RequestId;
  task: TaskId;
  step: StepId;
  user: UserId;
};

const getTestConnectionPool = async (options?: { createFixtures: boolean }) => {
  if (!pool) {
    pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "steps_admin_test",
      password: "",
      port: 5432
    });
  }

  // create DB fixtures if requested
  if (options.createFixtures) {
    let media;
    let org;
    let request;
    let task;
    let step;
    let user;

    let res: any;

    // Org
    res = (await new OrgRepository(pool).getAll())[0];
    if (res) {
      org = res.id;
    } else {
      org = await new OrgRepository(pool).save(
        new Org({
          name: "NAME",
          sms_number: "SMS_NUMBER",
          logo: "LOGO"
        })
      );
    }

    // User
    res = (await new UserRepository(pool).getAll())[0];
    if (res) {
      user = res.id;
    } else {
      user = await new UserRepository(pool).save(
        new User({
          first_name: "FIRST",
          last_name: "LAST",
          email: "EMAIL",
          phone: "PHONE",
          org_id: org,
          color: "COLOR",
          goals: ["walk", "run"],
          status: "AWAITING_HELP",
          type: "Client",
          updated: new Date(),
          platform: "SMS",
          follow_up_date: new Date()
        })
      );
    }

    // Task
    res = (await new TaskRepository(pool).getAll())[0];
    if (res) {
      task = res.id;
    } else {
      task = await new TaskRepository(pool).save(
        new Task({
          title: "TITLE",
          category: "CATEGORY",
          description: "DESCRIPTION",
          status: "ACTIVE",
          created_by: org,
          user_id: user,
          difficulty: "EASY",
          date_created: new Date(),
          date_completed: new Date()
        })
      );
    }

    // Request
    res = (await new RequestRepository(pool).getAll())[0];
    if (res) {
      request = res.id;
    } else {
      request = await new RequestRepository(pool).save(
        new Request({
          status: "NEEDS_ASSISTANCE",
          user_id: user,
          task_id: task
        })
      );
    }

    // Step
    res = (await new StepRepository(pool).getAll())[0];
    if (res) {
      step = res.id;
    } else {
      step = await new StepRepository(pool).save(
        new Step({
          text: "TEXT",
          note: "NOTE",
          task_id: task
        })
      );
    }

    // Media
    res = (await new MediaRepository(pool).getAll())[0];
    if (res) {
      media = res.id;
    } else {
      media = await new MediaRepository(pool).save(
        new Media({
          step_id: step,
          task_id: task,
          title: "TITLE",
          category: "CATEGORY",
          description: "DESCRIPTION",
          url: "URL",
          image: "IMAGE",
          published_by: org,
          type: "GENERAL_EDUCATION"
        })
      );
    }

    // export created fixtures
    fixtures = {
      media,
      org,
      request,
      task,
      step,
      user
    };
  } // end if(options.createFixtures)

  return pool;
};

export { getTestConnectionPool, fixtures };
