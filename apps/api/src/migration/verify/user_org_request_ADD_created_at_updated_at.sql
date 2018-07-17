-- Verify steps:user_org_request_ADD_created_at_updated_at on pg

BEGIN;


SELECT 1/(1 - COUNT(*)) FROM information_schema.columns -- should not exist
WHERE table_name = 'user' AND column_name = 'updated';

SELECT created_at, updated_at FROM "user" LIMIT 1;
SELECT created_at, updated_at FROM org LIMIT 1;
SELECT created_at, updated_at FROM request LIMIT 1;


ROLLBACK;
