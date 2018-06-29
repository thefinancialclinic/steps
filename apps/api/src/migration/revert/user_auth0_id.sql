-- Revert steps:user_auth0_id from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN auth0_id;

COMMIT;
