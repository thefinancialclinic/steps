-- Verify steps:user_temp_help_response on pg

BEGIN;

SELECT temp_help_response FROM "user";

ROLLBACK;
