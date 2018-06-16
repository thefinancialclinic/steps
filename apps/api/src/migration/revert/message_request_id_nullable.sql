-- Revert steps:message_request_id_nullable from pg

BEGIN;

ALTER TABLE "message" ALTER COLUMN request_id SET NOT NULL;

COMMIT;
