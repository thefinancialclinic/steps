-- Revert steps:viewed_media from pg

BEGIN;

DROP TABLE viewed_media;

COMMIT;
