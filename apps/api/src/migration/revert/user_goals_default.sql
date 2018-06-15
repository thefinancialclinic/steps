-- Revert steps:user_goals_default from pg

BEGIN;

ALTER TABLE "user" ALTER COLUMN goals DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN goals DROP NOT NULL;

COMMIT;
