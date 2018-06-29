-- Deploy steps:message_topic to pg
-- requires: appschema

BEGIN;

ALTER TABLE message ADD COLUMN topic text;

COMMIT;
