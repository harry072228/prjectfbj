-- public.chatroom_history_list definition

-- Drop table

-- DROP TABLE public.chatroom_history_list;

CREATE TABLE public.chatroom_history_list (
	id serial4 NOT NULL,
	chat_history_name varchar(100) NULL,
	chatroom_id int4 NULL,
	CONSTRAINT chatroom_history_list_pkey PRIMARY KEY (id)
);


-- public.department definition

-- Drop table

-- DROP TABLE public.department;

CREATE TABLE public.department (
	id serial4 NOT NULL,
	department_name varchar NOT NULL,
	profit float8 NULL,
	loss float8 NULL,
	department_turnover float8 NULL,
	CONSTRAINT department_pkey PRIMARY KEY (id)
);


-- public.first_group_history definition

-- Drop table

-- DROP TABLE public.first_group_history;

CREATE TABLE public.first_group_history (
	id serial PRIMARY KEY,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.kanban definition

-- Drop table

-- DROP TABLE public.kanban;

CREATE TABLE public.kanban (
	id serial4 NOT NULL,
	kanban_name varchar(255) NOT NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT kanban_pkey PRIMARY KEY (id)
);


-- public.not_public_group_history definition

-- Drop table

-- DROP TABLE public.not_public_group_history;

CREATE TABLE public.not_public_group_history (
	id serial PRIMARY KEY,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.only_you_history definition

-- Drop table

-- DROP TABLE public.only_you_history;

CREATE TABLE public.only_you_history (
	id serial PRIMARY KEY,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.private_chat_history definition

-- Drop table

-- DROP TABLE public.private_chat_history;

CREATE TABLE public.private_chat_history (
	id serial4 NOT NULL,
	send_user int4 NOT NULL,
	message_content varchar NOT NULL,
	receive_user int4 NOT NULL,
	created_at timestamptz NULL
);


-- public.public_channel_chat_history definition

-- Drop table

-- DROP TABLE public.public_channel_chat_history;

CREATE TABLE public.public_channel_chat_history (
	id serial PRIMARY KEY,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.second_group_history definition

-- Drop table

-- DROP TABLE public.second_group_history;

CREATE TABLE public.second_group_history (
	id serial PRIMARY KEY,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.test_history definition

-- Drop table

-- DROP TABLE public.test_history;

CREATE TABLE public.test_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL,
	CONSTRAINT test_history_pkey PRIMARY KEY (id)
);


-- public.testtest_history definition

-- Drop table

-- DROP TABLE public.testtest_history;

CREATE TABLE public.testtest_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL,
	CONSTRAINT testtest_history_pkey PRIMARY KEY (id)
);


-- public.timetable definition

-- Drop table

-- DROP TABLE public.timetable;

CREATE TABLE public.timetable (
	id serial4 NOT NULL,
	"date" varchar(255) NOT NULL,
	topic varchar(255) NOT NULL,
	clock time NOT NULL,
	department varchar(255) NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT timetable_pkey PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	username varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	roles varchar NULL,
	profile_pic varchar NULL,
	profile_background varchar NULL,
	email varchar NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- public.chatroom_list definition

-- Drop table

-- DROP TABLE public.chatroom_list;

CREATE TABLE public.chatroom_list (
	id serial4 NOT NULL,
	chatroom_name varchar NULL,
	created_at timestamptz NULL,
	updated_at timestamptz NULL,
	history_id int4 NULL,
	user_id int4 NULL,
	chatroom_properties varchar NULL,
	CONSTRAINT chatroom_list_pkey PRIMARY KEY (id),
	CONSTRAINT chatroom_list_history_id_fkey FOREIGN KEY (history_id) REFERENCES public.chatroom_history_list(id),
	CONSTRAINT chatroom_list_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);


-- public.chatroom_member_relationship definition

-- Drop table

-- DROP TABLE public.chatroom_member_relationship;

CREATE TABLE public.chatroom_member_relationship (
	id serial4 NOT NULL,
	chatroom_id int4 NOT NULL,
	user_id int4 NOT NULL,
	CONSTRAINT chatroom_member_relationship_pkey PRIMARY KEY (id),
	CONSTRAINT chatroom_member_relationship_chatroom_id_fkey FOREIGN KEY (chatroom_id) REFERENCES public.chatroom_list(id)
);


-- public.kanban_user definition

-- Drop table

-- DROP TABLE public.kanban_user;

CREATE TABLE public.kanban_user (
	id serial4 NOT NULL,
	kanban_id int4 NULL,
	user_id int4 NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT kanban_user_pkey PRIMARY KEY (id),
	CONSTRAINT kanban_user_kanban_id_fkey FOREIGN KEY (kanban_id) REFERENCES public.kanban(id),
	CONSTRAINT kanban_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
