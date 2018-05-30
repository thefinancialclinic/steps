-- Deploy steps:user_plan_url to pg
-- requires: appschema

BEGIN;

ALTER TABLE "user" ADD COLUMN plan_url TEXT;

COMMIT;
