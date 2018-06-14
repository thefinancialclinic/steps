-- Verify steps:user_fb_id on pg

BEGIN;

SELECT 1/count(*)
FROM information_schema.columns
WHERE table_name = 'user'
AND column_name = 'fb_id';

ROLLBACK;
