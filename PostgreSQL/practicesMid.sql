
CREATE Table students0 (
    s_id SERIAL PRIMARY key,
    s_name VARCHAR(25),
    department_id INTEGER REFERENCES departments0(d_id),
    last_login DATE 
);
DROP Table students0;

CREATE Table departments0 (
    d_id SERIAL PRIMARY KEY,
    d_name VARCHAR(20)
);

CREATE Table courses0 (
    c_id SERIAL PRIMARY KEY,
    title VARCHAR(30)
);
CREATE TABLE departments01 (
    department_id SERIAL PRIMARY KEY,
    d_name VARCHAR(20)
);

INSERT INTO departments0 (d_name) VALUES ('CSE'), ('EEE'), ('BBA'),('ENG'),('LLB'),('PHY'),('CHE'),('MBA');

INSERT INTO courses0 (title) VALUES ('Data Structures'), ('Physics'), ('Accounting');

INSERT INTO students0 (s_name, department_id, last_login) VALUES
('Rakib', 1, '2024-12-01'),
('Sami', 2, '2024-11-15'),
('Fahim', 1, '2023-10-25'),
('Nabila', 3, '2024-01-05'),
('Nabi', 5, '2024-01-05'),
('sakib', NULL, '2024-01-05');

UPDATE students0
SET last_login = '2025-05-01'
WHERE s_id = 5;


SELECT * FROM departments0;
SELECT * FROM students0 ORDER BY s_id ASC;
SELECT * FROM courses0;


-- Retrieve students who have logged in within the last 30 days.
-- Extract the login month from the last_login and group students by month.
-- Count how many students logged in per month and show only those months where login count is more than 3.


SELECT * FROM students0
WHERE last_login >= CURRENT_DATE - INTERVAL '30 days'

SELECT EXTRACT(MONTH FROM last_login)as login_month,
count(*) FROM students0 
WHERE last_login IS NOT NULL
GROUP BY login_month 
ORDER BY login_month;

SELECT EXTRACT(MONTH FROM last_login)as login_month,
count(*) FROM students0
WHERE last_login is not NULL
GROUP BY login_month
HAVING count (*) > 1
ORDER BY login_month;

-- Create a foreign key constraint on department_id in the students table referencing departments(id).

-- Try inserting a student with a department_id that doesn’t exist and observe the behavior.

-- Delete a department and see how students are affected using ON DELETE CASCADE and ON DELETE SET NULL.


SELECT * FROM departments0;
SELECT * FROM students0 ORDER BY s_id ASC;

-- Join students and departments using INNER JOIN to display each student's department name
SELECT students0.s_name, departments0.d_name FROM students0
INNER JOIN departments0 ON students0.department_id = departments0.d_id

-- Use a LEFT JOIN to show all students including those without a department.
SELECT s.s_name, d.d_name FROM students0 s
LEFT JOIN departments0 d ON s.department_id = d.d_id;

-- Use a RIGHT JOIN to show all departments including those without students.
SELECT s.s_name, d.d_name FROM students0 s
Right JOIN departments0 d ON s.department_id = d.d_id;

-- Perform a FULL JOIN to get all records from both students and departments.

SELECT s.s_name,d.d_name,s.last_login FROM students0 s
FULL JOIN departments0 d ON s.department_id = d.d_id;

-- Create a cross-product of all students and courses using CROSS JOIN.
SELECT * FROM students0 
CROSS JOIN departments0 ;

-- Use NATURAL JOIN between tables that have a shared column like department_id.
-- NATURAL JOIN কাজ করবে শুধুমাত্র তখনই, যখন দুই টেবিলে একই নামের কলাম থাকবে। তাই department_id উভয় টেবিলে থাকতে হবে।
SELECT * FROM students0 
NATURAL JOIN departments01;



