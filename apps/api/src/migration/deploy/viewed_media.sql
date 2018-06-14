-- Deploy steps:viewed_media to pg
-- requires: appschema

BEGIN;

CREATE TABLE viewed_media (
  id SERIAL,
  client_id INTEGER NOT NULL REFERENCES "user" (id),
  media_id  INTEGER NOT NULL REFERENCES media (id)
);

COMMIT;
