-- Revert steps:request_created_at from pg

BEGIN;

ALTER TABLE request DROP COLUMN created_at;

COMMIT;
