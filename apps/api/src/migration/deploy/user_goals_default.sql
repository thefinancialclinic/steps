-- Deploy steps:user_goals_default to pg

BEGIN;

UPDATE "user" SET goals = '{}' WHERE goals IS NULL;
ALTER TABLE "user" ALTER COLUMN goals SET NOT NULL;
ALTER TABLE "user" ALTER COLUMN goals SET DEFAULT '{}'::text[];

COMMIT;
