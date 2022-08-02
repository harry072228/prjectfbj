chatroom_list -- public.chatroom_list definition
-- Drop table
-- DROP TABLE public.chatroom_list;
CREATE TABLE public.chatroom_list_two (
	id int4 NOT NULL DEFAULT nextval('chatsystem_id_seq'::regclass),
	chatroom_name varchar NOT NULL,
	created_at timestamptz NULL,
	updated_at timestamptz NULL
);
select chatroom_id,
	user_id
from chatroom_member_relationship
	inner join chatroom_list on chatroom_member_relationship.chatroom_id = chatroom_list.id
	inner join users on chatroom_member_relationship.user_id = users.id
SELECT user_name,
	message_content,
	created_at::time
from (
		select id,
			user_name,
			message_content,
			created_at
		from public_channel_chat_history
		ORDER by id DESC
		limit 10
	) T
order by id;
SELECT created_at::time
from (
		select *
		from public_channel_chat_history
		ORDER by id DESC
		limit 10
	) T
order by id;
CREATE TABLE not_public_group_history (
	id SERIAL primary key,
	chatroom_id INTEGER not null,
	FOREIGN key (chatroom_id) REFERENCES chatroom_list(chat_history_id),
	user_id INTEGER not null,
	user_name VARCHAR(50),
	message_content varchar,
	created_at timestamptz NULL,
	FOREIGN key (user_id) REFERENCES users(id)
);
SELECT chat_history_id
from chatroom_list
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
	AND table_type = 'BASE TABLE'
	AND
select *
from chatroom_member_relationship
	inner join chatroom_list on chatroom_member_relationship.chatroom_id = chatroom_list.id
	inner join users on chatroom_member_relationship.user_id = users.id
where user_id = 11
ALTER TABLE chatroom_list
ADD FOREIGN KEY (id) REFERENCES not_public_group_history(chatroom_id);
-- public.not_public_group_history definition
-- Drop table
DROP TABLE public.not_public_group_history;
CREATE TABLE public.not_public_group_history (
	id chatroom_id int4 NOT NULL,
	user_id int4 NOT NULL,
	user_name varchar(50) NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	CONSTRAINT not_public_group_chathistory_pkey PRIMARY KEY (id),
	CONSTRAINT not_public_group_chathistory_chatroom_id_fkey FOREIGN KEY (chatroom_id) REFERENCES public.chatroom_list(id),
	CONSTRAINT not_public_group_chathistory_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
-- public.chatroom_member_relationship definition
-- Drop table
-- DROP TABLE public.chatroom_member_relationship;
CREATE TABLE public.chatroom_history_relationship (
	id serial,
	chatroom_id integer,
	FOREIGN KEY (chatroom_id) REFERENCES chatroom_list (id),
	history_id integer,
	FOREIGN KEY (history_id) REFERENCES chatroom_history_list (id)
);
CREATE TABLE chatroom_history_list (
	id SERIAL primary key,
	chat_hisstory_name VARCHAR(100)
);
-- public.public_channel_chat_history definition
-- Drop table
-- DROP TABLE public.public_channel_chat_history;
CREATE TABLE public.not_public_group_history (
	id int4 NOT NULL DEFAULT nextval('testchatrecord_id_seq'::regclass),
	user_name varchar NULL,
	message_content varchar NULL,
	created_at timestamptz NULL,
	user_id int4 NULL
);
-- Drop table
-- DROP TABLE public.chatroom_list;
CREATE TABLE public.chatroom_list (
	id serial4 NOT NULL,
	chatroom_name varchar NOT NULL,
	created_at timestamptz NULL,
	updated_at timestamptz NULL,
	CONSTRAINT chatroom_list_pkey PRIMARY KEY (id)
);
CREATE TABLE public.chatroom_list_test (
	id serial4 NOT NULL,
	chatroom_name varchar NOT NULL,
	created_at timestamptz NULL,
	updated_at timestamptz NULL,
	histroy_id int4 NULL,
	FOREIGN KEY (histroy_id) REFERENCES chatroom_history_list(id),
	CONSTRAINT chatroom_list_test_pkey PRIMARY KEY (id)
);
INSERT INTO public.chatroom_list_test (
		id,
		chatroom_name,
		created_at,
		updated_at,
		histroy_id
	)
VALUES(
		1,
		'1st Group',
		'2022-07-08 11:21:27.630',
		'2022-07-08 11:21:27.630',
		1
	);
INSERT INTO public.chatroom_list_test (
		id,
		chatroom_name,
		created_at,
		updated_at,
		histroy_id
	)
VALUES(
		2,
		'2nd Group',
		'2022-07-08 11:21:27.632',
		'2022-07-08 11:21:27.632',
		2
	);
INSERT INTO public.chatroom_list_test (
		id,
		chatroom_name,
		created_at,
		updated_at,
		histroy_id
	)
VALUES(
		3,
		'Only You',
		'2022-07-08 11:21:27.633',
		'2022-07-08 11:21:27.633',
		3
	);
INSERT INTO public.chatroom_list_test (
		id,
		chatroom_name,
		created_at,
		updated_at,
		histroy_id
	)
VALUES(
		4,
		'Not Public Group',
		'2022-07-08 11:21:27.635',
		'2022-07-08 11:21:27.635',
		4
	);
select *
from chatroom_list
	inner join chatroom_history_list on chatroom_list.history_id = chatroom_history_list.id DROP TABLE chatroom_list_test;
ALTER TABLE chatroom_member_relationship DROP chatroom_id;
ALTER TABLE chatroom_member_relationship
add chatroom_id INTEGER;
ALTER TABLE chatroom_member_relationship
add FOREIGN KEY (chatroom_id) REFERENCES chatroom_list(id);
ALTER TABLE chatroom_history_list
add chatroom_id INTEGER;
alter table chatroom_history_list
add FOREIGN KEY (chatroom_id) REFERENCES chatroom_list(id);
select chat_hisstory_name
from chatroom_history_list
WHERE chatroom_id = 1
select user_name
from chatroom_member_relationship
	inner join users on chatroom_member_relationship.user_id = users.id
where chatroom_id = $1
select username,
	user_id
from chatroom_member_relationship
	inner join users on chatroom_member_relationship.user_id = users.id
where chatroom_id = 2
select id,
	username
from users
WHERE username ilike '%10%';
create table private_chat (
	id serial4 NOT NULL,
	send_user INTEGER NOT NULL,
	message_content VARCHAR NOT NULL,
	receive_user INTEGER NOT NULL,
	created_at timestamptz NULL,
	FOREIGN KEY (send_user) REFERENCES users(id),
	FOREIGN KEY (receive_user) REFERENCES users(id)
);
select username
from users
order by id DESC
limit 10;
select message_content,
	created_at
from private_chat_history
where send_user = 12
	or send_user = 11
	and receive_user = 11
	or receive_user = 12;
SELECT user_name,
	message_content,
	created_at::time
from (
		select id,
			user_name,
			message_content,
			created_at
		from public_channel_chat_history
		ORDER by id DESC
		limit 20
	) T
order by id;
select message_content,
	created_at
from private_chat_history
where send_user = $1
	or send_user = $2
	and receive_user = $1
	or receive_user = $2;
select users.id,
	username,
	message_content
from private_chat_history
	inner join users on private_chat_history.send_user = users.id
where send_user = 11
	and receive_user = 12
	or send_user = 12
	and receive_user = 11 create table private_chat_history (
		id serial4 NOT NULL,
		send_user INTEGER NOT NULL,
		message_content VARCHAR NOT NULL,
		receive_user INTEGER NOT NULL,
		created_at timestamptz NULL,
		FOREIGN KEY (send_user) REFERENCES users(id),
		FOREIGN KEY (receive_user) REFERENCES users(id)
	);
create table chatroom_history_list (
	id serial4 NOT NULL,
	chat_history_name varchar(100) NOT NULL,
	chatroom_id INTEGER NOT NULL,
	FOREIGN KEY (chatroom_id) REFERENCES chatroom_list(id)
);
alter TABLE chatroom_history_list
	RENAME COLUMN chat_hisstory_name TO chat_history_name;
alter TABLE chatroom_history_list
add COLUMN chatroom_id INTEGER
alter TABLE chatroom_list
add COLUMN history_id INTEGER
alter TABLE chatroom_list
add FOREIGN key (history_id) REFERENCES chatroom_history_list(id)
select created_at::time,
	username,
	message_content
from private_chat_history
	inner join users on private_chat_history.send_user = users.id
where send_user = 11
	and receive_user = 12
	or send_user = 12
	and receive_user = 11
ORDER by created_at DESC;

SELECT user_name,
	message_content,
	created_at::time,
	id
from (
		select id,
			user_name,
			message_content,
			created_at
		from public_channel_chat_history
		ORDER by id DESC
		limit 20
	) T
order by id;

select created_at::time, username, message_content from (
	select* from private_chat_history
					inner join users
					on private_chat_history.send_user=users.id
					where send_user = 11 and receive_user = 12
					or send_user = 12 and receive_user = 11
					ORDER by created_at DESC limit 20) T
					order by created_at::time
