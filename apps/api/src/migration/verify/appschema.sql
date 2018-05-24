-- Verify steps:appschema on pg

BEGIN;

-- 1 / 0 will throw an exception and fail the test
SELECT 1/COUNT(*) FROM information_schema.tables WHERE table_name = 'media';
SELECT 1/COUNT(*) FROM information_schema.tables WHERE table_name = 'message';
SELECT 1/COUNT(*) FROM information_schema.tables WHERE table_name = 'org';
SELECT 1/COUNT(*) FROM information_schema.tables WHERE table_name = 'request';
SELECT 1/COUNT(*) FROM information_schema.tables WHERE table_name = 'step';
SELECT 1/COUNT(*) FROM information_schema.tables WHERE table_name = 'task';
SELECT 1/COUNT(*) FROM information_schema.tables WHERE table_name = 'user';

ROLLBACK;
