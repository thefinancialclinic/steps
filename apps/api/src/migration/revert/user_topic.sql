-- Revert steps:user_topic from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN topic;

COMMIT;
