-- Revert steps:user_add_unique_email from pg

BEGIN;

ALTER TABLE "user" DROP CONSTRAINT user_email_unique;

COMMIT;
