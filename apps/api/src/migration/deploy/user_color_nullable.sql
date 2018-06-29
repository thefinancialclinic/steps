-- Deploy steps:user_color_nullable to pg
-- requires: appschema

BEGIN;

ALTER TABLE "user" ALTER COLUMN color DROP NOT NULL;

COMMIT;
