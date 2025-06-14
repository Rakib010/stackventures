 -- Create a table to store student information
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    first_name VARCHAR(50) NOT NULL, -- First name cannot be null
    last_name VARCHAR(50), -- Last name is optional
    age INT, -- Age of the student
    grade CHAR(2), -- Grade in course (like A, B+)
    course VARCHAR(50), -- Name of the course
    email VARCHAR(100), -- Email address of the student
    dob DATE, -- Date of birth
    blood_group VARCHAR(5), -- Blood group of the student
    country VARCHAR(50) -- Country of origin
);

-- View all data in the student table
SELECT * FROM student;

-- View only first_name and age columns
SELECT first_name, age FROM student;

-- Insert 10 students' data into the student table
INSERT INTO
    student (
        first_name,
        last_name,
        age,
        grade,
        course,
        email,
        dob,
        blood_group,
        country
    )
VALUES (
        'Alice',
        'Johnson',
        20,
        'A+',
        'Mathematics',
        'alice.johnson@email.com',
        '2004-01-15',
        'O+',
        'USA'
    ),
    (
        'Bob',
        'Smith',
        21,
        'B',
        'Physics',
        'bob.smith@email.com',
        '2003-06-12',
        'A-',
        'Canada'
    ),
    (
        'Charlie',
        'Brown',
        22,
        'A',
        'Chemistry',
        'charlie.brown@email.com',
        '2002-03-30',
        'B+',
        'UK'
    ),
    (
        'Daisy',
        'Lee',
        19,
        'C',
        'Biology',
        'daisy.lee@email.com',
        '2005-10-05',
        'AB-',
        'Australia'
    ),
    (
        'Ethan',
        'Clark',
        23,
        'B+',
        'Engineering',
        'ethan.clark@email.com',
        '2001-11-20',
        'O-',
        'India'
    ),
    (
        'Fiona',
        'Adams',
        20,
        'A-',
        'Computer Science',
        'fiona.adams@email.com',
        '2004-08-25',
        'B-',
        'Germany'
    ),
    (
        'George',
        'Turner',
        24,
        'C+',
        'History',
        'george.turner@email.com',
        '2000-02-10',
        'AB+',
        'France'
    ),
    (
        'Hannah',
        'Scott',
        21,
        'B-',
        'Economics',
        'hannah.scott@email.com',
        '2003-04-18',
        'O+',
        'Bangladesh'
    ),
    (
        'Isaac',
        'Wright',
        22,
        'A',
        'English',
        'isaac.wright@email.com',
        '2002-07-09',
        'A+',
        'Japan'
    ),
    (
        'Jasmine',
        'Nguyen',
        20,
        'B+',
        'Psychology',
        'jasmine.nguyen@email.com',
        '2004-12-02',
        'O-',
        'Vietnam'
    );

-- Display only the email addresses of all students, with alias "student_email"
SELECT email AS "student_email" FROM student;

-- Sort the data by first_name in ascending (A-Z) order
SELECT * FROM student ORDER BY first_name ASC;

-- Sort the data by age in descending (high to low) order
SELECT * FROM student ORDER BY age DESC;

-- Sort the data by date of birth in descending order (newest first)
SELECT * FROM student ORDER BY dob DESC;

-- Show all country names (with duplicates)
SELECT country FROM student;

-- Show all country names sorted alphabetically
SELECT country FROM student ORDER BY country ASC;

-- Show only unique (distinct) country names
SELECT DISTINCT country FROM student;

-- Filter: Get all students from the USA
SELECT * FROM student WHERE country = 'USA';

-- Filter: Get students who got 'A' grade and are studying Physics
SELECT * FROM student WHERE grade = 'A' AND course = 'Physics';

-- Filter: Get all students with blood group A+
SELECT * FROM student WHERE blood_group = 'A+';

-- Filter: Get students from either USA or Australia
SELECT * FROM student WHERE country = 'USA' OR country = 'Australia';

-- Filter: Get students from USA or Australia AND age is 20
SELECT *
FROM student
WHERE (
        country = 'USA'
        OR country = 'Australia'
    )
    AND age = 20;

-- Filter: Get students older than 20
SELECT * FROM student WHERE age > 20;

-- Filter: Get students aged 20 or younger
SELECT * FROM student WHERE age <= 20;

-- Filter: Get students whose age is NOT 20
SELECT * FROM student WHERE age <> 20;

-- Show all student data (same as SELECT *)
SELECT * FROM student;

-- Exploring Scalar and Aggregate Functions in PostgreSQL
SELECT upper(first_name) FROM student;

SELECT UPPER(first_name || ' ' || last_name) AS full_name_upper
FROM student;

-- Scalar function (Scalar functions operate on a single value and return a single result per row.)
SELECT length(first_name) FROM student;


-- Aggregate Functions (Aggregate functions operate on a set of rows and return a single summary value.)
SELECT avg(age) FROM student;
SELECT max(age) FROM student;
SELECT min(age) FROM student;
SELECT sum(age) FROM student;
SELECT count(age) FROM student;

-- scalar & Aggregate combine
SELECT max(length(first_name)) FROM student


-- Logical Negation: NOT

-- Select all students whose country is NOT 'USA'
SELECT * FROM student 
WHERE NOT country = 'USA';

-- Understanding NULL

-- Comparison with NULL returns NULL (i.e., unknown)
SELECT NULL <> 1;

-- Get students whose email is NOT NULL
SELECT * FROM student
WHERE email IS NOT NULL;

-- View all students (including those with NULLs)
SELECT * FROM student;

-- Null-Coalescing Operator: COALESCE()

-- Returns first non-null value (5 in this case)
SELECT COALESCE(NULL, 5);

-- Replace NULL email values with 'not provided'
SELECT COALESCE(email, 'not provided') AS email_status FROM student;

-- IN Operator
-- Select students from USA, UK, or Canada (long way)
SELECT * FROM student
WHERE country = 'USA' OR country = 'UK' OR country = 'Canada';

-- Using IN (short and clean)
SELECT * FROM student
WHERE country IN ('USA', 'UK', 'Canada');

-- Using NOT IN
SELECT * FROM student
WHERE country NOT IN ('USA', 'UK', 'Canada');

-- BETWEEN Operator
-- Select students aged between 19 and 20 (inclusive)
SELECT * FROM student
WHERE age BETWEEN 19 AND 20;

-- Select students born between 2000 and 2003
SELECT * FROM student
WHERE dob BETWEEN '2000-01-01' AND '2003-01-01'
ORDER BY dob;


-- LIKE Operator (Pattern Matching - Case Sensitive)
-- First name ends with 'b'
SELECT * FROM student 
WHERE first_name LIKE '%b';

-- First name starts with 'b'
SELECT * FROM student 
WHERE first_name LIKE 'b%';

-- First name has any 2 characters, then 'a%'
SELECT * FROM student 
WHERE first_name LIKE '__a%';

-- ILIKE Operator (Pattern Matching - Case Insensitive)
-- First name starts with 'A' (matches 'alice', 'ALICE', etc.)
SELECT * FROM student 
WHERE first_name ILIKE 'A%';

-- Pagination with Limit Offset and Data Deletion 
SELECT * FROM student LIMIT 5;

SELECT * FROM student
WHERE country IN ('USA', 'UK', 'Canada') LIMIT 1;

-- pagination 
SELECT * FROM student LIMIT 5 OFFSET 5*0;
SELECT * FROM student LIMIT 5 OFFSET 5*1;
SELECT * FROM student LIMIT 5 OFFSET 5*2;

-- Delete a student with ID = 3 (Delete a specific row:)
DELETE FROM student
WHERE student_id = 3 ;

-- Delete students from a specific country (Delete multiple rows:)
DELETE FROM student
WHERE country = 'USA';

SELECT * FROM student;

-- UPDATE Operator
UPDATE student 
 set email = 'Hello@gmail'
 WHERE student_id = 1;
UPDATE student 
 set grade = 'A+',age = 20
 WHERE student_id  BETWEEN 2 AND 5 ;

 SELECT * FROM student ORDER BY student_id ASC;









 

