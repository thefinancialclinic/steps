-- Deploy steps:task_steps to pg
-- requires: appschema

BEGIN;

ALTER TABLE task ADD COLUMN steps JSON[] DEFAULT '{}'::JSON[];

-- Copy over any existing steps that belong to tasks
UPDATE task SET (steps) = (
	SELECT array_agg(json_build_object('text', "text", 'note', note))
	  FROM step
	 WHERE step.task_id = task.id
);

-- Remove step from media
ALTER TABLE media DROP CONSTRAINT constraint_resource;
ALTER TABLE media DROP COLUMN step_id;

-- Remove step table
ALTER TABLE step DROP CONSTRAINT fk_step_task;
DROP TABLE step;


COMMIT;
