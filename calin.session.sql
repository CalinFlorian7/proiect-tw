-- Active: 1698130823267@@127.0.0.1@3306
-- ALTER TABLE users MODIFY COLUMN your_column_name INT AUTO_INCREMENT;

-- Disable foreign key checks


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