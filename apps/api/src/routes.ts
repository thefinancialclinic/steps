
import { ClientController } from "./controller/ClientController";
import { CoachController } from "./controller/CoachController";
import { OrgController } from "./controller/OrgController";
import { UserController } from "./controller/UserController";

export const Routes = [
  {
    method: "get",
    route: "/clients",
    controller: UserController,
    action: "all"
  },
  {
    method: "get",
    route: "/clients/:id",
    controller: UserController,
    action: "one"
  },
  {
    method: "post",
    route: "/clients",
    controller: UserController,
    action: "save"
  },
  {
    method: "delete",
    route: "/clients/:id",
    controller: UserController,
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
    route: "/coaches/:id",
    controller: CoachController,
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
    route: "/orgs/:id",
    controller: OrgController,
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
    route: "/users/:id",
    controller: UserController,
    action: "remove"
  }
];
