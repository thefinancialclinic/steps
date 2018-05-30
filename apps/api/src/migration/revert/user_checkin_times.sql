-- Revert steps:user_checkin_times from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN checkin_times;

COMMIT;
