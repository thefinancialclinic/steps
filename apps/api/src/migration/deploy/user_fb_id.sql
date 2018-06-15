-- Deploy steps:user_fb_id to pg
-- requires: appschema

BEGIN;

ALTER TABLE "user" ADD COLUMN fb_id text;

COMMIT;
