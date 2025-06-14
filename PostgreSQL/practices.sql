
CREATE Table students (
    s_id SERIAL PRIMARY KEY,
    roll INTEGER,
    u_name VARCHAR(25),
    age INTEGER,
    department VARCHAR(25),
    score INTEGER,
    s_status VARCHAR(25),
    last_login DATE
);

DROP Table students;

INSERT INTO students (roll, u_name, age, department, score, s_status, last_login) VALUES
(101, 'Rakib', 22, 'CSE', 85, 'active', '2025-05-01'),
(102, 'Sami', 21, 'EEE', 78, 'active', '2025-05-02'),
(103, 'Fahim', 23, 'CSE', 90, 'inactive', '2025-04-25'),
(104, 'Nayeem', 20, 'BBA', 65, 'active', '2025-05-03'),
(105, 'Tanvir', 24, 'CSE', 55, 'suspended', '2025-03-20'),
(106, 'Rima', 22, 'English', 92, 'active', '2025-05-04'),
(107, 'Mitu', 21, 'EEE', 60, 'inactive', '2025-04-30'),
(108, 'Tania', 23, 'CSE', 88, 'active', '2025-05-01'),
(109, 'Sabbir', 22, 'BBA', 70, 'active', '2025-04-29'),
(110, 'Hasan', 24, 'CSE', 95, 'active', '2025-05-05'),
(111, 'Jannat', 20, 'English', 75, 'inactive', '2025-05-03');


-- Add a column email (VARCHAR) to the existing students table.
-- Rename the column email to student_email.
-- Add a UNIQUE constraint to student_email.
-- Add a PRIMARY KEY to a new table named courses.
-- Drop a column from any existing table.


SELECT * FROM students;
ALTER TABLE students 
 ADD COLUMN email VARCHAR(20);

ALTER table students
RENAME COLUMN email to student_email;

ALTER Table students
ADD constraint student_email UNIQUE(student_email);

ALTER TABLE students
DROP COLUMN score;

 UPDATE students
 set student_email = 'Hello@gmail.com'
 WHERE s_id BETWEEN 1 and 11;

 UPDATE students
 set u_name = 'Alice'
 WHERE s_id = 1;
 UPDATE students
 set u_name = 'alice'
 WHERE s_id = 3;

 

-- Filtering & Logical Operations 
-- Write a query to find all students who have a score greater than 80 and not null.
-- Use the NOT operator to exclude students from a specific department.
-- Fetch students whose names start with ‘A’ using LIKE and ILIKE.
-- Select all students whose age is between 18 and 25.
-- Retrieve rows using IN for a specific set of roll numbers.

SELECT * FROM students
WHERE score > 80 ;

SELECT * FROM students
WHERE department != 'CSE';

SELECT * FROM students
WHERE u_name LIKE 'a%';

SELECT * FROM students
WHERE u_name ILIKE 'A%';

SELECT * FROM students
WHERE age BETWEEN 18 and 25
ORDER BY s_id ASC ;

SELECT * FROM students
WHERE roll IN (105,106);

-- Aggregate Functions 
-- Count how many students exist in the students table.
-- Find the average score of students in a specific department.
-- Get the maximum and minimum age of all students.

SELECT count(*) FROM students;

SELECT avg(score) FROM students
WHERE department = 'CSE';

-- Update the status of students who scored less than 50 to 'failed'.
-- Delete students who have not logged in since last year.
-- Use LIMIT and OFFSET to fetch the second page of results (5 per page)

UPDATE students 
set s_status = 'failed'
WHERE score < 80 ;

SELECT * FROM students ORDER BY s_id ASC;

-- SELECT extract(YEAR FROM last_login) FROM students;

DELETE FROM students 
WHERE last_login < '2026-05-05';

SELECT * FROM students ORDER BY roll LIMIT 5 OFFSET 5*0; 
SELECT * FROM students ORDER BY roll LIMIT 5 OFFSET 5*1; 
SELECT * FROM students ORDER BY roll LIMIT 5 OFFSET 5*2; 









