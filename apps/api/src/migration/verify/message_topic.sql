-- Verify steps:message_topic on pg

BEGIN;

SELECT topic from message;

ROLLBACK;
