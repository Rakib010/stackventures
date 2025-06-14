-- Step 1: Drop tables if they exist
DROP TABLE IF EXISTS post1;
DROP TABLE IF EXISTS user1;

-- Step 2: Create the user1 table
CREATE TABLE user1 (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(25) NOT NULL
);

-- Step 3: Create the post1 table with foreign key referencing user1
CREATE TABLE post1 (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    user_id INTEGER REFERENCES user1(id)
);

-- Step 4: Insert data into user1
INSERT INTO user1 (user_name) VALUES 
('kib'),
('Sami'),
('Fahim');

-- Step 5: Insert data into post1
INSERT INTO post1 (title, user_id) VALUES 
('Learning PostgreSQL is fun!', 1),
('Exploring SQL Joins', 2),
('Understanding Foreign Keys', 3);

-- Step 6: View the data
SELECT * FROM user1;
SELECT * FROM post1;

SELECT title,user_name FROM post1
 JOIN user1 on post1.user_id = user1.id;
SELECT * FROM post1
 JOIN user1 on post1.user_id = user1.id;
 
 INSERT INTO post1 (id,title, user_id) VALUES 
(5,'SQL is fun!', NULL);

INSERT INTO user1 (user_name) VALUES 
('miraz');

SELECT * FROM post1
 LEFT JOIN user1 on post1.user_id = user1.id;

SELECT * FROM post1
 RIGHT JOIN user1 on post1.user_id = user1.id;

SELECT * FROM post1
 FULL JOIN user1 on post1.user_id = user1.id;


 

 
 