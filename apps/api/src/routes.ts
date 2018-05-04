import { UserController } from "./controller/UserController";
import { TaskController } from "./controller/TaskController";

export const Routes = [
      {
            method: "get",
            route: "/admins",
            controller: TaskController,
            action: "all"
      },
      {
            method: "get",
            route: "/admins/:id",
            controller: TaskController,
            action: "one"
      },
      {
            method: "post",
            route: "/admins",
            controller: TaskController,
            action: "save"
      },
      {
            method: "delete",
            route: "/admins",
            controller: TaskController,
            action: "remove"
      },
      {
            method: "get",
            route: "/clients",
            controller: TaskController,
            action: "all"
      },
      {
            method: "get",
            route: "/clients/:id",
            controller: TaskController,
            action: "one"
      },
      {
            method: "post",
            route: "/clients",
            controller: TaskController,
            action: "save"
      },
      {
            method: "delete",
            route: "/clients",
            controller: TaskController,
            action: "remove"
      },
      {
            method: "get",
            route: "/coaches",
            controller: TaskController,
            action: "all"
      },
      {
            method: "get",
            route: "/coaches/:id",
            controller: TaskController,
            action: "one"
      },
      {
            method: "post",
            route: "/coaches",
            controller: TaskController,
            action: "save"
      },
      {
            method: "delete",
            route: "/coaches",
            controller: TaskController,
            action: "remove"
      },
  {
    method: "get",
    route: "/contents",
    controller: TaskController,
    action: "all"
  },
  {
    method: "get",
    route: "/contents/:id",
    controller: TaskController,
    action: "one"
  },
  {
    method: "post",
    route: "/contents",
    controller: TaskController,
    action: "save"
  },
  {
    method: "delete",
    route: "/contents",
    controller: TaskController,
    action: "remove"
  },
  {
    method: "get",
    route: "/files",
    controller: TaskController,
    action: "all"
  },
  {
    method: "get",
    route: "/files/:id",
    controller: TaskController,
    action: "one"
  },
  {
    method: "post",
    route: "/files",
    controller: TaskController,
    action: "save"
  },
  {
    method: "delete",
    route: "/files",
    controller: TaskController,
    action: "remove"
  },
  {
    method: "get",
    route: "/messages",
    controller: TaskController,
    action: "all"
  },
  {
    method: "get",
    route: "/messages/:id",
    controller: TaskController,
    action: "one"
  },
  {
    method: "post",
    route: "/messages",
    controller: TaskController,
    action: "save"
  },
  {
    method: "delete",
    route: "/messages",
    controller: TaskController,
    action: "remove"
  },
  {
    method: "get",
    route: "/orgs",
    controller: TaskController,
    action: "all"
  },
  {
    method: "get",
    route: "/orgs/:id",
    controller: TaskController,
    action: "one"
  },
  {
    method: "post",
    route: "/orgs",
    controller: TaskController,
    action: "save"
  },
  {
    method: "delete",
    route: "/orgs",
    controller: TaskController,
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
    controller: TaskController,
    action: "all"
  },
  {
    method: "get",
    route: "/task_templates/:id",
    controller: TaskController,
    action: "one"
  },
  {
    method: "post",
    route: "/task_templates",
    controller: TaskController,
    action: "save"
  },
  {
    method: "delete",
    route: "/task_templates",
    controller: TaskController,
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
