-- Revert steps:appschema from pg

BEGIN;

-- Order is important! (or use CASCADE)
DROP TABLE message;
DROP TABLE media;
DROP TABLE step;
DROP TABLE request;
DROP TABLE task;
DROP TABLE "user";
DROP TABLE org;

COMMIT;
