CREATE TABLE timetable (
    id SERIAL primary key,
	topic varchar(255) NOT NULL,
	clock_in_time TIME NOT NULL,
    department VARCHAR(255)
);


INSERT INTO public.users (username,pass_word,created_at,updated_at) VALUES
	 ('leo','123','2022-06-28 00:00:00','2022-06-28 00:00:00'),
	 ('charles','123','2022-06-28 00:00:00','2022-06-28 00:00:00'),
	 ('fung','123','2022-06-28 00:00:00','2022-06-28 00:00:00');
