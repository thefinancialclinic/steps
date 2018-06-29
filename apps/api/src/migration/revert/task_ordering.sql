-- Revert steps:task_ordering from pg

BEGIN;

ALTER TABLE "task" DROP COLUMN "order";

COMMIT;
