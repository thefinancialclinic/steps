-- Verify steps:task_order_insert_trigger on pg

BEGIN;


SELECT 1/COUNT(*) FROM information_schema.triggers
  WHERE trigger_name = 'task_insert';

SELECT 1/COUNT(*) FROM information_schema.routines
  WHERE routine_name = 'assign_task_order';


ROLLBACK;
