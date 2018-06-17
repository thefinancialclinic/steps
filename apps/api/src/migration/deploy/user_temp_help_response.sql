-- Deploy steps:user_temp_help_response to pg
-- requires: appschema

BEGIN;

ALTER TABLE "user" ADD COLUMN temp_help_response TEXT;

COMMIT;
