-- Active: 1698130823267@@127.0.0.1@3306
-- ALTER TABLE users MODIFY COLUMN your_column_name INT AUTO_INCREMENT;
-- commit;

-- show tables;
-- describe documents;
-- alter Table documents drop COLUMN document_id;
-- alter table documents add COLUMN document_id int auto_increment PRIMARY KEY;
-- alter TABLE images drop COLUMN image_id;
-- alter TABLE images ADD COLUMN image_id int auto_increment PRIMARY KEY;

-- describe notes;
-- alter table notes drop COLUMN note_id;
-- alter TABLE notes add column note_id int auto_increment PRIMARY KEY;
-- alter table documents add CONSTRAINT documents_ibfk_1 FOREIGN KEY(note_id) REFERENCES notes(note_id) ;
-- alter TABLE images ADD CONSTRAINT images_ibfk_1 FOREIGN KEY(note_id) REFERENCES notes(note_id) ;
-- alter TABLE ratings add CONSTRAINT ratings_ibfk_1 FOREIGN KEY(note_id) REFERENCES notes(note_id) ;
-- alter TABLE ratings drop CONSTRAINT ratings_ibfk_1;
-- alter TABLE images drop CONSTRAINT images_ibfk_1;
-- alter table documents drop CONSTRAINT documents_ibfk_1;
-- DESCRIBE subjects;
-- alter table subjects drop column subject_id;
-- alter TABLE subjects add COLUMN subject_id int auto_increment PRIMARY KEY;
-- alter TABLE notes DROP CONSTRAINT notes_ibfk_2;
-- alter table enrollments drop CONSTRAINT enrollments_ibfk_2;
-- DESCRIBE enrollments;
-- DESCribe subjects;

-- alter TABLE enrollments add CONSTRAINT enrollments_ibfk_2 FOREIGN KEY(subject_id) REFERENCES subjects(subject_id);
-- alter table notes add CONSTRAINT notes_ibfk_2 FOREIGN KEY(subject_id) REFERENCES subjects(subject_id);
-- alter Table enrollments MODIFY COLUMN subject_id int;
-- alter table notes modify column subject_id int;

-- alter table teachers drop COLUMN teacher_id;
-- alter TABLE teachers add COLUMN teacher_id int auto_increment PRIMARY KEY;
-- alter table subjects drop CONSTRAINT subjects_ibfk_1;
-- alter TABLE subjects add CONSTRAINT subjects_ibfk_1 FOREIGN KEY(teacher_id) REFERENCES teachers(teacher_id);
-- describe teachers;
-- insert into teachers (faculty_id,teacher_name,email,teacher_password) VALUES(
--     2,"dan","ddasdassd","dasparola")

-- alter Table faculty drop column faculty_id;
-- alter table faculty add COLUMN faculty_id INT AUTO_INCREMENT PRIMARY KEY;
-- alter table teachers drop constraint teachers_ibfk_1;
-- alter Table teachers add CONSTRAINT teachers_ibfk_1 FOREIGN KEY(faculty_id) REFERENCES faculty(faculty_id) ;
-- INSERT into faculty (faculty_name,university_id) VALUES('stat',1);
-- select * from faculty;
-- DESCRIBE faculty;
-- insert INTO faculty VALUES (1,"cibe");
-- select faculty_name from university where university_id>0;
-- describe subjects;  
-- describe university;
-- alter table university drop column university_id;
-- alter table university add column university_id INT AUTO_INCREMENT PRIMARY KEY;
-- alter table faculty drop CONSTRAINT faculty_ibfk_1;
-- alter Table faculty add CONSTRAINT faculty_ibfk_1 FOREIGN key(university_id) REFERENCES university(university_id);
-- DEScribe university;
-- insert into university(university_name,university_adress)VALUES('ase','bucuresti');
-- insert into faculty VALUES(1,1,"cibernetica");

-- SELECT * from university;
-- INSERT into university VALUES()
-- Disable foreign key checks
-- describe notes;
-- describe images;
-- describe documents;
-- Drop foreign key constraint
-- ALTER TABLE enrollments DROP constraint enrollments_ibfk_1;
-- alter table notes drop CONSTRAINT notes_ibfk_1;
-- alter table ratings drop CONSTRAINT ratings_ibfk_2;
-- alter TABLE users drop column user_id;
-- alter table users add COLUMN user_id int not NULL AUTO_INCREMENT PRIMARY KEY;
-- DESCRIBE users;
-- DESCRIBE enrollments;
-- SELECT CONSTRAINT_NAME
-- FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
-- WHERE TABLE_NAME = 'enrollments'
-- AND COLUMN_NAME = 'user_id';

-- Modify column with AUTO_INCREMENT
-- alter table users MODIFY  user_id int PRIMARY KEY AUTO_INCREMENT;

-- DESCRIBE users;

-- -- Add foreign key constraint back
-- ALTER TABLE enrollments ADD CONSTRAINT enrollments_ibfk_1 FOREIGN KEY (user_id) REFERENCES users(user_id);
-- ALTER TABLE ratings ADD CONSTRAINT ratings_ibfk_2 FOREIGN KEY (user_id) REFERENCES users(user_id);
-- alter TABLE users modify COLUMN user_id int PRIMARY KEY  UNIQUE AUTO_INCREMENT;
-- alter Table users add column id int not NULL AUTO_INCREMENT UNIQUE KEY;
-- DESCRIBE notes;
-- alter Table users drop column id;
-- DESCRIBE users;
-- alter TABLE users modify user_id before user_name;
-- insert into users (user_name, user_email, user_password) values ('calin', 'dsadsa',"dsada");

-- select * from users
-- commit
-- SELECT * from users;
-- alter Table users add CONSTRAINT user_email_unique UNIQUE (user_email);

-- SELECT * from users;
-- delete  from users where user_id=18;