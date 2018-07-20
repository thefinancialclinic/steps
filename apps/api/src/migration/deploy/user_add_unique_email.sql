-- Deploy steps:user_add_unique_email to pg
-- requires: appschema

BEGIN;

ALTER TABLE "user" ADD CONSTRAINT user_email_unique UNIQUE (email);

COMMIT;
