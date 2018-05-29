import { resolve } from "path";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { Pool } from "pg";
import express = require("express");
import { writeFileSync, writeFile } from "fs";
import YAML = require("yamljs");
import * as url from "url";

const PORT = process.env.PORT || "3001";

const localConnString = "postgres://postgres@localhost:5432/steps_admin_test";
const connUrl = url.parse(process.env.DATABASE_URL || localConnString);

export const pool = new Pool({
  user: connUrl.auth.split(":")[0],
  password: connUrl.auth.split(":")[1],
  host: connUrl.hostname,
  database: connUrl.pathname.slice(1), // drop leading slash
  port: parseInt(connUrl.port),
});

const app = express();

app.use(bodyParser.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors());

  // when not running in production, expose an API documentation route
  // makeSwagger(Routes)
  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = YAML.load("./swagger.yaml");

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  app.use(express.static(resolve(__dirname, "..", "..", "admin", ".build")));
}

// register express routes from defined application routes
Routes.forEach(route => {
  (app as any)[route.method](
    route.route,
    (req: Request, res: Response, next: Function) => {
      const result = new (route.controller as any)()[route.action](
        req,
        res,
        next
      );
      if (result instanceof Promise) {
        result.then(
          result =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
        );
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    }
  );
});

// start express server
app.listen(PORT);
console.log(`Express server has started on port ${PORT}.`);
process.env.NODE_ENV !== "production"
  ? console.log("docs at: /api-docs")
  : false;
