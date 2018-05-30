-- Deploy steps:user_topic to pg
-- requires: appschema

BEGIN;

ALTER TABLE "user" ADD COLUMN topic TEXT;

COMMIT;
