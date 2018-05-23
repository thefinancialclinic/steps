-- Deploy steps:appschema to pg

BEGIN;

-- ORG
CREATE TABLE org ( 
	id                   serial  ,
	name                 text  NOT NULL,
	sms_number           text  NOT NULL,
	logo                 text  ,
	CONSTRAINT unq_org_id UNIQUE ( id ) 
 );


-- MEDIA
CREATE TABLE media ( 
	id                   serial  NOT NULL,
	step_id              integer  ,
	task_id              integer  ,
	title                text  NOT NULL,
	category             text  NOT NULL,
	description          text  ,
	url                  text  ,
	image                text  ,
	published_by         integer DEFAULT -1 ,
	"type"               text  ,
	CONSTRAINT pk_resource_id PRIMARY KEY ( id )
 );
ALTER TABLE media ADD CONSTRAINT constraint_resource CHECK ( step_id IS NOT NULL OR task_id IS NOT NULL );
ALTER TABLE media ADD CONSTRAINT constraint_media CHECK ( type in ('TASK_CONTENT', 'TASK_RESOURCE', 'STORY', 'GENERAL_EDUCATION') );
CREATE INDEX idx_resource_step_id ON media ( step_id );
CREATE INDEX idx_resource_task_id ON media ( task_id );
CREATE INDEX idx_media_published_by ON media ( published_by );


-- MESSAGE
CREATE TABLE message ( 
	id                   serial  NOT NULL,
	text                 text  NOT NULL,
	to_user              integer  NOT NULL,
	from_user            integer  NOT NULL,
	media_id             integer  ,
	request_id           integer  NOT NULL,
	"timestamp"          timestamptz DEFAULT current_timestamp NOT NULL,
	responses            json  ,
	CONSTRAINT pk_message_id PRIMARY KEY ( id )
 );

CREATE INDEX idx_message_to_user ON message ( to_user );
CREATE INDEX idx_message_from_user ON message ( from_user );
CREATE INDEX idx_message_request_id ON message ( request_id );
CREATE INDEX idx_message_media_id ON message ( media_id );


-- REQUEST
CREATE TABLE request ( 
	id                   serial  NOT NULL,
	status               text  ,
	user_id              integer  NOT NULL,
	task_id              integer  NOT NULL,
	CONSTRAINT pk_request_id PRIMARY KEY ( id )
 );

ALTER TABLE request ADD CONSTRAINT constraint_request CHECK ( status in ('NEEDS_ASSISTANCE', 'REPLIED', 'RESOLVED') );
CREATE INDEX idx_request_user_id ON request ( user_id );
CREATE INDEX idx_request_task_id ON request ( task_id );


-- STEP
CREATE TABLE step ( 
	id                   serial  NOT NULL,
	text                 text  NOT NULL,
	note                 text  ,
	task_id              integer  ,
	CONSTRAINT pk_step_id PRIMARY KEY ( id )
 );

CREATE INDEX idx_step_task_id ON step ( task_id );


-- TASK
CREATE TABLE task ( 
	id                   serial  NOT NULL,
	title                text  NOT NULL,
	category             text  NOT NULL,
	description          text  ,
	status               text  ,
	created_by           integer  ,
	user_id              integer  ,
	difficulty           text  ,
	date_created         date DEFAULT current_date NOT NULL,
	date_completed       date  ,
  recurring            json  ,
	CONSTRAINT pk_task_id PRIMARY KEY ( id )
 );

ALTER TABLE task ADD CONSTRAINT constraint_task_status CHECK ( status in ('ACTIVE', 'COMPLETED', 'ARCHIVED') );
ALTER TABLE task ADD CONSTRAINT constraint_task_difficulty CHECK ( difficulty in ('EASY', 'MODERATE', 'DIFFICULT') );
CREATE INDEX idx_task_user_id ON task ( user_id );
CREATE INDEX idx_task_created_by ON task ( created_by );


-- USER
CREATE TABLE "user" ( 
	id                   serial  NOT NULL,
	first_name           text  NOT NULL,
	last_name            text  NOT NULL,
	email                text  NOT NULL,
	phone                text  ,
	coach_id             integer  ,
	org_id               integer  NOT NULL,
	color                text  NOT NULL,
	goals                text ARRAY  ,
	status               text  NOT NULL,
	"type"               text  NOT NULL,
	updated              timestamptz  ,
	platform             text  ,
	image                text  ,
	follow_up_date       timestamptz  ,
	CONSTRAINT pk_user_id PRIMARY KEY ( id )
 );

ALTER TABLE "user" ADD CONSTRAINT constraint_user_type CHECK ( type in ('Client', 'Coach', 'Admin', 'Superadmin') );
ALTER TABLE "user" ADD CONSTRAINT constraint_user_platform CHECK ( platform in ('SMS', 'FBOOK') );
ALTER TABLE "user" ADD CONSTRAINT constraint_user_status CHECK ( status in ('AWAITING_HELP', 'WORKING', 'NON_RESPONSIVE') );
CREATE INDEX idx_user_org_id ON "user" ( org_id );
CREATE INDEX idx_user_coach_id ON "user" ( coach_id );


-- FOREIGN KEYS
ALTER TABLE media ADD CONSTRAINT fk_resource_step       FOREIGN KEY ( step_id )      REFERENCES step( id );
ALTER TABLE media ADD CONSTRAINT fk_resource_task       FOREIGN KEY ( task_id )      REFERENCES task( id );
ALTER TABLE media ADD CONSTRAINT fk_media_org           FOREIGN KEY ( published_by ) REFERENCES org( id );

ALTER TABLE message ADD CONSTRAINT fk_message_to_user   FOREIGN KEY ( to_user )      REFERENCES "user"( id );
ALTER TABLE message ADD CONSTRAINT fk_message_from_user FOREIGN KEY ( from_user )    REFERENCES "user"( id );
ALTER TABLE message ADD CONSTRAINT fk_message_request   FOREIGN KEY ( request_id )   REFERENCES request( id );
ALTER TABLE message ADD CONSTRAINT fk_message_media     FOREIGN KEY ( media_id )     REFERENCES media( id );

ALTER TABLE request ADD CONSTRAINT fk_request_user      FOREIGN KEY ( user_id )      REFERENCES "user"( id );
ALTER TABLE request ADD CONSTRAINT fk_request_task      FOREIGN KEY ( task_id )      REFERENCES task( id );

ALTER TABLE step ADD CONSTRAINT fk_step_task            FOREIGN KEY ( task_id )      REFERENCES task( id );

ALTER TABLE task ADD CONSTRAINT fk_task_org             FOREIGN KEY ( created_by )   REFERENCES org( id );
ALTER TABLE task ADD CONSTRAINT fk_task_user            FOREIGN KEY ( user_id )      REFERENCES "user"( id );

ALTER TABLE "user" ADD CONSTRAINT fk_user_org           FOREIGN KEY ( org_id )       REFERENCES org( id );
ALTER TABLE "user" ADD CONSTRAINT fk_user_user          FOREIGN KEY ( coach_id )     REFERENCES "user"( id );

COMMIT;
