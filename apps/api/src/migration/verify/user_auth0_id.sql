-- Verify steps:user_auth0_id on pg

BEGIN;

SELECT auth0_id FROM "user";

ROLLBACK;
