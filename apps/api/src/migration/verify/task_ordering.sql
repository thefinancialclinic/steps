-- Verify steps:task_ordering on pg

BEGIN;

SELECT 1/count(*)
FROM information_schema.columns
WHERE table_name = 'task'
AND column_name = 'order';

ROLLBACK;
