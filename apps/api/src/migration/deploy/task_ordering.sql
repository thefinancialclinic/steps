-- Deploy steps:task_ordering to pg
-- requires: appschema

BEGIN;

ALTER TABLE "task" ADD COLUMN "order" text;

COMMIT;
