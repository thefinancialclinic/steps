-- Deploy steps:original_task_id to pg
-- requires: appschema

BEGIN;

ALTER TABLE task ADD COLUMN original_task_id INTEGER REFERENCES task (id); 

COMMIT;
