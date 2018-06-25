-- Revert steps:org_sms_number_nullable from pg

BEGIN;

ALTER TABLE "org" ALTER COLUMN sms_number SET NOT NULL;

COMMIT;
