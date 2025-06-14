

CREATE View dept_avg_salary 
As
SELECT department_name, avg(salary)
FROM employees1
GROUP BY department_name;

SELECT * FROM dept_avg_salary;

-- simplifying complex queries
-- Improved security
-- Enhanced data abstraction

-- view 2 types 
