import { UserController } from "./controller/UserController";
import { TaskController } from "./controller/TaskController";

export const Routes = [
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
  }
];
