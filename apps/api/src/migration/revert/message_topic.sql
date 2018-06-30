-- Revert steps:message_topic from pg

BEGIN;

ALTER TABLE message DROP COLUMN topic;

COMMIT;
