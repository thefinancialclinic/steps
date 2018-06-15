-- Revert steps:user_fb_id from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN fb_id;

COMMIT;
