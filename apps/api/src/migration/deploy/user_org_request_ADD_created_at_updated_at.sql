-- Deploy steps:user_org_request_ADD_created_at_updated_at to pg
-- requires: request_created_at

BEGIN;


-- Manage created_at/updated_at automatically (invisible to application)
CREATE FUNCTION on_record_insert() RETURNS trigger AS $$
  DECLARE
    id_sequence VARCHAR;
  BEGIN
    SELECT TG_ARGV[0] INTO id_sequence;     -- the name of the ID sequence for this table
    NEW.id         := nextval(id_sequence); -- set the ID as the next sequence value
    NEW.created_at := now();
    NEW.updated_at := now();
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION on_record_update() RETURNS trigger AS $$
  BEGIN
    NEW.id         := OLD.id;         -- ensure IDs aren't altered on updates
    NEW.created_at := OLD.created_at; -- ensure date-created isn't altered on updates
    NEW.updated_at := now();
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

ALTER TABLE "user" ADD COLUMN created_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE "user" RENAME COLUMN updated TO updated_at;
UPDATE "user" SET updated_at = now() WHERE updated_at IS NULL; -- needs default
ALTER TABLE "user"
    ALTER COLUMN updated_at SET NOT NULL,
    ALTER COLUMN updated_at SET DEFAULT now();

ALTER TABLE org ADD COLUMN created_at timestamptz NOT NULL DEFAULT now ();
ALTER TABLE org ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now ();

-- request(created_at) already exists, set it to not null & set a default of now
UPDATE request SET created_at = now() WHERE created_at IS NULL; -- needs default
ALTER TABLE request
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE request ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();

-- Attach triggers to inserts/updates. Timestamps will update automatically
CREATE TRIGGER user_insert BEFORE INSERT ON "user" FOR EACH ROW EXECUTE PROCEDURE on_record_insert('user_id_seq');
CREATE TRIGGER user_update BEFORE UPDATE ON "user" FOR EACH ROW EXECUTE PROCEDURE on_record_update();

CREATE TRIGGER org_insert BEFORE INSERT ON org FOR EACH ROW EXECUTE PROCEDURE on_record_insert('org_id_seq');
CREATE TRIGGER org_update BEFORE UPDATE ON org FOR EACH ROW EXECUTE PROCEDURE on_record_update();

CREATE TRIGGER request_insert BEFORE INSERT ON request FOR EACH ROW EXECUTE PROCEDURE on_record_insert('request_id_seq');
CREATE TRIGGER request_update BEFORE UPDATE ON request FOR EACH ROW EXECUTE PROCEDURE on_record_update();


COMMIT;
