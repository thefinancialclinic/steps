-- Verify steps:user_goals_default on pg

BEGIN;

SELECT 1/COUNT(*) from information_schema.columns where table_name = 'user' and column_name = 'goals' and is_nullable = 'NO';
SELECT 1/COUNT(*) from information_schema.columns where table_name = 'user' and column_name = 'goals' and column_default = '''{}''::text[]';

ROLLBACK;
