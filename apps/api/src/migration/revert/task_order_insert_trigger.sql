-- Revert steps:task_order_insert_trigger from pg

BEGIN;


DROP TRIGGER task_insert ON task;
DROP FUNCTION assign_task_order;


COMMIT;
