-- Deploy steps:user_auth0_id to pg
-- requires: appschema

BEGIN;

ALTER TABLE "user" ADD COLUMN auth0_id text;

COMMIT;
