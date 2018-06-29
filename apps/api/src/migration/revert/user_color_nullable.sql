-- Revert steps:user_color_nullable from pg

BEGIN;

ALTER TABLE "user" ALTER COLUMN color SET NOT NULL;

COMMIT;
