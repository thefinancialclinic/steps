-- Verify steps:org_sms_number_nullable on pg

BEGIN;

SELECT 1/COUNT(*) FROM information_schema.columns WHERE table_name = 'org' AND column_name = 'sms_number' AND is_nullable = 'YES';

ROLLBACK;
