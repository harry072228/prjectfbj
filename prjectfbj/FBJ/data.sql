CREATE TABLE public.users (
	id serial4 NOT NULL,
	username varchar(255) NOT NULL,
	pass_word varchar(255) NOT NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


INSERT INTO public.users (username,pass_word,created_at,updated_at) VALUES
	 ('leo','123','2022-06-28 00:00:00','2022-06-28 00:00:00'),
	 ('charles','123','2022-06-28 00:00:00','2022-06-28 00:00:00'),
	 ('fung','123','2022-06-28 00:00:00','2022-06-28 00:00:00');
