-- Revert steps:user_temp_help_response from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN temp_help_response;

COMMIT;
