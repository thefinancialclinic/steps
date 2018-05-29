-- Revert steps:user_plan_url from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN plan_url;

COMMIT;
