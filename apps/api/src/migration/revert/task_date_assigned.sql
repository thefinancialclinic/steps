-- Revert steps:task_date_assigned from pg

BEGIN;

ALTER TABLE task DROP COLUMN date_assigned;

COMMIT;
