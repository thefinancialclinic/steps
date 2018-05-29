-- Verify steps:user_plan_url on pg

BEGIN;

SELECT plan_url FROM "user";

ROLLBACK;
