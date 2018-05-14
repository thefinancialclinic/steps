import { AdminController } from "./controller/AdminController";
import { ClientController } from "./controller/ClientController";
import { CoachController } from "./controller/CoachController";
import { ContentController } from "./controller/ContentController";
import { FileController } from "./controller/FileController";
import { MessageController } from "./controller/MessageController";
import { OrgController } from "./controller/OrgController";
import { TaskController } from "./controller/TaskController";
import { TaskTemplateController } from "./controller/TaskTemplateController";
import { UserController } from "./controller/UserController";

export const Routes = [
  {
    method: "get",
    route: "/admins",
    controller: AdminController,
    action: "all"
  },
  {
    method: "get",
    route: "/admins/:id",
    controller: AdminController,
    action: "one"
  },
  {
    method: "post",
    route: "/admins",
    controller: AdminController,
    action: "save"
  },
  {
    method: "delete",
    route: "/admins",
    controller: AdminController,
    action: "remove"
  },
  {
    method: "get",
    route: "/clients",
    controller: ClientController,
    action: "all"
  },
  {
    method: "get",
    route: "/clients/:id",
    controller: ClientController,
    action: "one"
  },
  {
    method: "post",
    route: "/clients",
    controller: ClientController,
    action: "save"
  },
  {
    method: "delete",
    route: "/clients",
    controller: ClientController,
    action: "remove"
  },
  {
    method: "get",
    route: "/coaches",
    controller: CoachController,
    action: "all"
  },
  {
    method: "get",
    route: "/coaches/:id",
    controller: CoachController,
    action: "one"
  },
  {
    method: "post",
    route: "/coaches",
    controller: CoachController,
    action: "save"
  },
  {
    method: "delete",
    route: "/coaches",
    controller: CoachController,
    action: "remove"
  },
  {
    method: "get",
    route: "/contents",
    controller: ContentController,
    action: "all"
  },
  {
    method: "get",
    route: "/contents/:id",
    controller: ContentController,
    action: "one"
  },
  {
    method: "post",
    route: "/contents",
    controller: ContentController,
    action: "save"
  },
  {
    method: "delete",
    route: "/contents",
    controller: ContentController,
    action: "remove"
  },
  {
    method: "get",
    route: "/files",
    controller: FileController,
    action: "all"
  },
  {
    method: "get",
    route: "/files/:id",
    controller: FileController,
    action: "one"
  },
  {
    method: "post",
    route: "/files",
    controller: FileController,
    action: "save"
  },
  {
    method: "delete",
    route: "/files",
    controller: FileController,
    action: "remove"
  },
  {
    method: "get",
    route: "/messages",
    controller: MessageController,
    action: "all"
  },
  {
    method: "get",
    route: "/messages/:id",
    controller: MessageController,
    action: "one"
  },
  {
    method: "post",
    route: "/messages",
    controller: MessageController,
    action: "save"
  },
  {
    method: "delete",
    route: "/messages",
    controller: MessageController,
    action: "remove"
  },
  {
    method: "get",
    route: "/orgs",
    controller: OrgController,
    action: "all"
  },
  {
    method: "get",
    route: "/orgs/:id",
    controller: OrgController,
    action: "one"
  },
  {
    method: "post",
    route: "/orgs",
    controller: OrgController,
    action: "save"
  },
  {
    method: "delete",
    route: "/orgs",
    controller: OrgController,
    action: "remove"
  },
  {
    method: "get",
    route: "/tasks",
    controller: TaskController,
    action: "all"
  },
  {
    method: "get",
    route: "/tasks/:id",
    controller: TaskController,
    action: "one"
  },
  {
    method: "post",
    route: "/tasks",
    controller: TaskController,
    action: "save"
  },
  {
    method: "delete",
    route: "/tasks",
    controller: TaskController,
    action: "remove"
  },
  {
    method: "get",
    route: "/task_templates",
    controller: TaskTemplateController,
    action: "all"
  },
  {
    method: "get",
    route: "/task_templates/:id",
    controller: TaskTemplateController,
    action: "one"
  },
  {
    method: "post",
    route: "/task_templates",
    controller: TaskTemplateController,
    action: "save"
  },
  {
    method: "delete",
    route: "/task_templates",
    controller: TaskTemplateController,
    action: "remove"
  },
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
  },
  {
    method: "delete",
    route: "/users",
    controller: UserController,
    action: "remove"
  },
];
