-- Deploy steps:message_request_id_nullable to pg
-- requires: appschema

BEGIN;

ALTER TABLE "message" ALTER COLUMN request_id DROP NOT NULL;

COMMIT;
