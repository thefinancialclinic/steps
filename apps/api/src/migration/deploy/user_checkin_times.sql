-- Deploy steps:user_checkin_times to pg
-- requires: appschema

BEGIN;

ALTER TABLE "user" ADD COLUMN checkin_times JSON[] DEFAULT '{}'::JSON[];

COMMIT;
