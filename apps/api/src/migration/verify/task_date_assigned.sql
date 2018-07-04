-- Verify steps:task_date_assigned on pg

BEGIN;

SELECT date_assigned FROM task;

ROLLBACK;
