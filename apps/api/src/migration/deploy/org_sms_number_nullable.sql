-- Deploy steps:org_sms_number_nullable to pg
-- requires: appschema

BEGIN;

ALTER TABLE "org" ALTER COLUMN sms_number DROP NOT NULL;

COMMIT;
