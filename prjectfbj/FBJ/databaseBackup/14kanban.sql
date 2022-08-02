  drop table kanban_user;
  drop table kanban;

CREATE TABLE kanban(
	id SERIAL primary key,
	status VARCHAR(255),
	kanban_name varchar(255) not null,
	created_at TIMESTAMP,
	updated_at TIMESTAMP
);




CREATE TABLE kanban_User(
	id SERIAL primary key,
	kanban_id INTEGER,
	FOREIGN key (kanban_id) REFERENCES kanban(id),
	user_id INTEGER,
	FOREIGN key (user_id) REFERENCES users(id),
	created_at TIMESTAMP,
	updated_at TIMESTAMP

);



CREATE TABLE kanban_item(
	id SERIAL primary key,
	kanban_id INTEGER,
	FOREIGN key (kanban_id) REFERENCES kanban(id),
	status VARCHAR(255),
	item_name varchar(255),
	created_at TIMESTAMP,
	updated_at TIMESTAMP
);

CREATE TABLE kanban_content(
	id SERIAL primary key,
	kanban_item_id integer,
	FOREIGN key (kanban_item_id) REFERENCES kanban_item(id),
	status VARCHAR(255),
	kanban_topic varchar(255),
	kanban_content varchar(255),
	kanban_deadline varchar(255) NOT NULL,
	created_at TIMESTAMP,
	updated_at TIMESTAMP
);