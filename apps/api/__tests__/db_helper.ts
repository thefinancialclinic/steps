import { Connection, createConnection } from "typeorm";
import { Coach } from "../src/entity/Coach";
import { Org } from "../src/entity/Org";
import { Client } from "../src/entity/Client";
import { Admin } from "../src/entity/Admin";
import { TaskTemplate } from "../src/entity/TaskTemplate";
import { File } from "../src/entity/File";
import { Request } from "../src/entity/Request";
import { Task } from "../src/entity/Task";
import { Step } from "../src/entity/Step";

let activeConn: Connection;
let fixtures: {
  admin: Admin;
  org: Org;
  coach: Coach;
  client: Client;
  taskTemplate: TaskTemplate;
  file: File;
  request: Request;
  task: Task;
  step: Step;
};

const getTestConnection = async (options?: { createFixtures: boolean }) => {
  if (!activeConn) {
    activeConn = await createConnection("test");
  }

  // create DB fixtures if requested
  if (options.createFixtures) {
    // UPSERT Org
    let org: Org = await activeConn
      .getRepository(Org)
      .createQueryBuilder()
      .getOne();
    if (!org) {
      await activeConn
        .createQueryBuilder()
        .insert()
        .into(Org)
        .values({ name: "ORG", botPhone: "FAKE" })
        .execute();
      org = await activeConn
        .getRepository(Org)
        .createQueryBuilder()
        .getOne();
    }

    // UPSERT Admin
    let admin: Admin = await activeConn
      .getRepository(Admin)
      .createQueryBuilder()
      .getOne();
    if (!admin) {
      await activeConn
        .createQueryBuilder()
        .insert()
        .into(Admin)
        .values({ org })
        .execute();
      admin = await activeConn
        .getRepository(Admin)
        .createQueryBuilder()
        .getOne();
    }

    // UPSERT Coach
    let coach: Coach = await activeConn
      .getRepository(Coach)
      .createQueryBuilder()
      .getOne();
    if (!coach) {
      await activeConn
        .createQueryBuilder()
        .insert()
        .into(Coach)
        .values({ org })
        .execute();
      coach = await activeConn
        .getRepository(Coach)
        .createQueryBuilder()
        .getOne();
    }

    // UPSERT Client
    let client: Client = await activeConn
      .getRepository(Client)
      .createQueryBuilder()
      .getOne();
    if (!client) {
      await activeConn
        .createQueryBuilder()
        .insert()
        .into(Client)
        .values({ org, coach, fullName: "FULL NAME" })
        .execute();
      client = await activeConn
        .getRepository(Client)
        .createQueryBuilder()
        .getOne();
    }

    // UPSERT TaskTemplate
    let taskTemplate: TaskTemplate = await activeConn
      .getRepository(TaskTemplate)
      .createQueryBuilder()
      .getOne();
    if (!taskTemplate) {
      await activeConn
        .createQueryBuilder()
        .insert()
        .into(TaskTemplate)
        .values({ org, admin })
        .execute();
      taskTemplate = await activeConn
        .getRepository(TaskTemplate)
        .createQueryBuilder()
        .getOne();
    }

    // UPSERT File
    let file: File = await activeConn
      .getRepository(File)
      .createQueryBuilder()
      .getOne();
    if (!file) {
      await activeConn
        .createQueryBuilder()
        .insert()
        .into(File)
        .values({ org })
        .execute();
      file = await activeConn
        .getRepository(File)
        .createQueryBuilder()
        .getOne();
    }


    // UPSERT Request
    let request: Request = await activeConn
      .getRepository(Request)
      .createQueryBuilder()
      .getOne();
    if (!request) {
      await activeConn
        .createQueryBuilder()
        .insert()
        .into(Request)
        .values({ status: "NEEDS_ASSISTANCE" })
        .execute();
      request = await activeConn
        .getRepository(Request)
        .createQueryBuilder()
        .getOne();
    }

    // UPSERT Task
    let task: Task = await activeConn
      .getRepository(Task)
      .createQueryBuilder()
      .getOne();
    if (!task) {
      await activeConn
        .createQueryBuilder()
        .insert()
        .into(Task)
        .values({
          content: 'CONTENT',
          client: client,
          org: org,
          dateCreated: new Date(),
        })
        .execute();
      task = await activeConn
        .getRepository(Task)
        .createQueryBuilder()
        .getOne();
    }

    // UPSERT Step
    let step: Step = await activeConn
      .getRepository(Step)
      .createQueryBuilder()
      .getOne();
    if (!step) {
      await activeConn
        .createQueryBuilder()
        .insert()
        .into(Step)
        .values({
          text: 'TEXT',
          task: task,
          note: 'NOTE',
        })
        .execute();
      step = await activeConn
        .getRepository(Step)
        .createQueryBuilder()
        .getOne();
    }

    // export created fixtures
    fixtures = {
      admin,
      org,
      coach,
      client,
      taskTemplate,
      file,
      request,
      task,
      step
    };
  } // end if(options.createFixtures)

  return activeConn;
};

export { getTestConnection, fixtures };
