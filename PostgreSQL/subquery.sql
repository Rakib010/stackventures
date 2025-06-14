-- A subquery is a nested query within another sql statement


CREATE TABLE employees1 (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(50),
    department_name VARCHAR(50),
    salary DECIMAL(10, 2),
    hire_date DATE
);

INSERT INTO employees1 (employee_name, department_name, salary, hire_date) VALUES
('Alice Johnson', 'HR', 50000.00, '2019-03-15'),
('Bob Smith', 'Engineering', 75000.00, '2020-06-10'),
('Carol White', 'Sales', 62000.00, '2018-11-05'),
('David Lee', 'Engineering', 80000.00, '2021-01-20'),
('Eva Brown', 'Marketing', 58000.00, '2022-02-14'),
('Frank Green', 'Finance', 69000.00, '2017-08-25'),
('Grace Kim', 'HR', 52000.00, '2020-09-30'),
('Hank Miller', 'Sales', 61000.00, '2021-07-18'),
('Ivy Wilson', 'Engineering', 77000.00, '2019-12-12'),
('Jake Adams', 'Marketing', 56000.00, '2022-05-05');


DROP TABLE employees1;
SELECT * FROM employees1;

-- Retrieve all employees whose salary is greater than the highest salary of the HR department.

SELECT max(salary) FROM employees1 WHERE department_name = 'HR';

SELECT * FROM employees1 WHERE salary >
(SELECT max(salary) FROM employees1 WHERE department_name = 'HR'
);

-- can  return a single value 
-- can return  multiple rows 
-- can return a single column 
-- Where Subqueries are Used:
-- In SELECT (as computed columns)
-- In FROM (as inline tables)
-- In WHERE / HAVING (for filtering)
-- In EXISTS, IN, NOT IN, etc.

SELECT *,(SELECT sum(salary) FROM employees1) FROM employees1;

SELECT * FROM (SELECT department_name,sum(salary) FROM employees1 GROUP BY department_name) as avg_salary;





