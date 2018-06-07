-- Verify steps:task_steps on pg

BEGIN;

SELECT steps from task;

-- Check that table 'step' does NOT exist
SELECT 1/(1 - count(*))
  FROM information_schema.tables
  WHERE table_name = 'step';

-- Check that media does not have step_id column
SELECT 1/(1 - count(*))
  FROM information_schema.columns
  WHERE table_name = 'media' AND column_name = 'step_id';

ROLLBACK;
