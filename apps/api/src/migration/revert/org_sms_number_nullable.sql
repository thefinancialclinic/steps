-- Revert steps:org_sms_number_nullable from pg

BEGIN;

UPDATE "org" SET sms_number = '' WHERE sms_number IS NULL;
ALTER TABLE "org" ALTER COLUMN sms_number SET NOT NULL;

COMMIT;
