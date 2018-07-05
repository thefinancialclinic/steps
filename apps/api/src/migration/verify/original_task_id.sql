-- Verify steps:original_task_id on pg

BEGIN;

SELECT original_task_id FROM task;

ROLLBACK;
