-- Deploy steps:task_order_insert_trigger to pg
-- requires: task_ordering

BEGIN;


CREATE FUNCTION assign_task_order() RETURNS trigger AS $$
  DECLARE
    next_order INTEGER;
  BEGIN
    SELECT COALESCE(MAX("order"), 0) + 1 FROM task INTO next_order; 
    NEW.order := next_order;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_insert
  BEFORE INSERT ON task
  FOR EACH ROW EXECUTE PROCEDURE assign_task_order();


COMMIT;
