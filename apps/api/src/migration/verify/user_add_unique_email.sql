-- Verify steps:user_add_unique_email on pg

BEGIN;

SELECT 1/COUNT(*) FROM information_schema.constraint_column_usage WHERE table_name = 'user' AND constraint_name = 'user_email_unique';

ROLLBACK;
