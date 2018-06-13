-- Revert steps:task_steps from pg

BEGIN;

CREATE TABLE step ( 
	id                   serial  NOT NULL,
	text                 text  NOT NULL,
	note                 text  ,
	task_id              integer  ,
	CONSTRAINT pk_step_id PRIMARY KEY (id)
 );

-- Move task.steps into their own table
INSERT INTO step (text, note, task_id)
SELECT
	unnest(steps)->>'text' as text,
	unnest(steps)->>'note' as note,
	task.id as task_id
FROM task;

ALTER TABLE step
  ADD CONSTRAINT fk_step_task
  FOREIGN KEY (task_id) REFERENCES task(id);

ALTER TABLE task DROP COLUMN steps;

-- Add (back) media references
ALTER TABLE media ADD COLUMN step_id INTEGER REFERENCES step(id);
ALTER TABLE media
  ADD CONSTRAINT constraint_resource
  CHECK ( step_id IS NOT NULL OR task_id IS NOT NULL );
ALTER TABLE media ADD
  CONSTRAINT fk_resource_step
  FOREIGN KEY (step_id) REFERENCES step(id);
CREATE INDEX idx_resource_step_id ON media (step_id);

COMMIT;
