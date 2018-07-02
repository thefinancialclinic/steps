-- Deploy steps:task_date_assigned to pg
-- requires: appschema

BEGIN;

ALTER TABLE task ADD COLUMN date_assigned date;

COMMIT;
