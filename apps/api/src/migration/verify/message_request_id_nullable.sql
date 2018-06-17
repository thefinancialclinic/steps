-- Verify steps:message_request_id_nullable on pg

BEGIN;

SELECT 1/COUNT(*) FROM information_schema.columns WHERE table_name = 'message' AND column_name = 'request_id' AND is_nullable = 'YES';

ROLLBACK;
