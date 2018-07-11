-- Revert steps:user_org_request_ADD_created_at_updated_at from pg

BEGIN;


ALTER TABLE "user" DROP COLUMN created_at;
ALTER TABLE "user" RENAME COLUMN updated_at TO updated;

ALTER TABLE org DROP COLUMN created_at;
ALTER TABLE org DROP COLUMN updated_at;

-- request(created_at) was not modified in deploy script
ALTER TABLE request DROP COLUMN updated_at;

DROP TRIGGER IF EXISTS user_insert ON "user";
DROP TRIGGER IF EXISTS user_update ON "user";

DROP TRIGGER IF EXISTS org_insert ON "org";
DROP TRIGGER IF EXISTS org_update ON "org";

DROP TRIGGER IF EXISTS request_insert ON "request";
DROP TRIGGER IF EXISTS request_update ON "request";

DROP FUNCTION IF EXISTS on_record_insert CASCADE;
DROP FUNCTION IF EXISTS on_record_update CASCADE;


COMMIT;
