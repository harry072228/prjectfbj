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


-- public.final_history definition

-- Drop table

-- DROP TABLE public.final_history;

CREATE TABLE public.final_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.first_group_history definition

-- Drop table

-- DROP TABLE public.first_group_history;

CREATE TABLE public.first_group_history (
	id SERIAL primary key,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.fung豬豬與charles豬豬與leo豬豬的群組_history definition

-- Drop table

-- DROP TABLE public.fung豬豬與charles豬豬與leo豬豬的群組_history;

CREATE TABLE public.fung豬豬與charles豬豬與leo豬豬的群組_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.hihihihihi_history definition

-- Drop table

-- DROP TABLE public.hihihihihi_history;

CREATE TABLE public.hihihihihi_history (
	id serial4 NOT NULL,
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
	status varchar(255) NULL,
	kanban_name varchar(255) NOT NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT kanban_pkey PRIMARY KEY (id)
);


-- public.linnauserid_history definition

-- Drop table

-- DROP TABLE public.linnauserid_history;

CREATE TABLE public.linnauserid_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.linna收唔收到_history definition

-- Drop table

-- DROP TABLE public.linna收唔收到_history;

CREATE TABLE public.linna收唔收到_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.newnew_history definition

-- Drop table

-- DROP TABLE public.newnew_history;

CREATE TABLE public.newnew_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.new谷_history definition

-- Drop table

-- DROP TABLE public.new谷_history;

CREATE TABLE public.new谷_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.not_public_group_history definition

-- Drop table

-- DROP TABLE public.not_public_group_history;

CREATE TABLE public.not_public_group_history (
	id SERIAL primary key,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.only_you_history definition

-- Drop table

-- DROP TABLE public.only_you_history;

CREATE TABLE public.only_you_history (
	id SERIAL primary key,
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
	id SERIAL primary key,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.second_group_history definition

-- Drop table

-- DROP TABLE public.second_group_history;

CREATE TABLE public.second_group_history (
	id SERIAL primary key,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.test6_history definition

-- Drop table

-- DROP TABLE public.test6_history;

CREATE TABLE public.test6_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL,
	CONSTRAINT test6_history_pkey PRIMARY KEY (id)
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


-- public.testtesttest_history definition

-- Drop table

-- DROP TABLE public.testtesttest_history;

CREATE TABLE public.testtesttest_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.testtesttesttesttest_history definition

-- Drop table

-- DROP TABLE public.testtesttesttesttest_history;

CREATE TABLE public.testtesttesttesttest_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.test唔知第幾次_history definition

-- Drop table

-- DROP TABLE public.test唔知第幾次_history;

CREATE TABLE public.test唔知第幾次_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.thelasttry_history definition

-- Drop table

-- DROP TABLE public.thelasttry_history;

CREATE TABLE public.thelasttry_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
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


-- public.trytry_history definition

-- Drop table

-- DROP TABLE public.trytry_history;

CREATE TABLE public.trytry_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
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
	personal_turnover int4 NULL,
	age int4 NULL,
	status varchar NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.又搵你試刀_history definition

-- Drop table

-- DROP TABLE public.又搵你試刀_history;

CREATE TABLE public.又搵你試刀_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.唔敢用數字喇_history definition

-- Drop table

-- DROP TABLE public.唔敢用數字喇_history;

CREATE TABLE public.唔敢用數字喇_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.新谷_history definition

-- Drop table

-- DROP TABLE public.新谷_history;

CREATE TABLE public.新谷_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.新谷試data_history definition

-- Drop table

-- DROP TABLE public.新谷試data_history;

CREATE TABLE public.新谷試data_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.求下你update個room_history definition

-- Drop table

-- DROP TABLE public.求下你update個room_history;

CREATE TABLE public.求下你update個room_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.試多次_history definition

-- Drop table

-- DROP TABLE public.試多次_history;

CREATE TABLE public.試多次_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);


-- public.谷_history definition

-- Drop table

-- DROP TABLE public.谷_history;

CREATE TABLE public.谷_history (
	id serial4 NOT NULL,
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
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


-- public.kanban_item definition

-- Drop table

-- DROP TABLE public.kanban_item;

CREATE TABLE public.kanban_item (
	id serial4 NOT NULL,
	kanban_id int4 NULL,
	status varchar(255) NULL,
	item_name varchar(255) NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT kanban_item_pkey PRIMARY KEY (id),
	CONSTRAINT kanban_item_kanban_id_fkey FOREIGN KEY (kanban_id) REFERENCES public.kanban(id)
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


-- public.kanban_content definition

-- Drop table

-- DROP TABLE public.kanban_content;

CREATE TABLE public.kanban_content (
	id serial4 NOT NULL,
	kanban_item_id int4 NULL,
	status varchar(255) NULL,
	kanban_topic varchar(255) NULL,
	kanban_content varchar(255) NULL,
	kanban_deadline varchar(255) NOT NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT kanban_content_pkey PRIMARY KEY (id),
	CONSTRAINT kanban_content_kanban_item_id_fkey FOREIGN KEY (kanban_item_id) REFERENCES public.kanban_item(id)
);