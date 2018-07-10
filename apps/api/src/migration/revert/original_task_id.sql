-- Revert steps:original_task_id from pg

BEGIN;

ALTER TABLE task DROP COLUMN original_task_id;

COMMIT;
