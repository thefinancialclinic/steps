-- Deploy steps:request_created_at to pg
-- requires: appschema

BEGIN;

ALTER TABLE request ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();

COMMIT;
