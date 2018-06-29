-- Verify steps:request_created_at on pg

BEGIN;

SELECT created_at FROM request;

ROLLBACK;
