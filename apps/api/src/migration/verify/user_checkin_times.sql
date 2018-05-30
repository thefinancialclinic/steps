-- Verify steps:user_checkin_times on pg

BEGIN;

SELECT checkin_times FROM "user";

ROLLBACK;
