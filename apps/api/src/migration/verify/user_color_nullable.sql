-- Verify steps:user_color_nullable on pg

BEGIN;

SELECT 1/COUNT(*) FROM information_schema.columns WHERE table_name = 'user' AND column_name = 'color' AND is_nullable = 'YES';

ROLLBACK;
