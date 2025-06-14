SELECT * FROM employees;

EXPLAIN ANALYSE
SELECT * FROM employees WHERE employee_name = 'Mike Miller';

CREATE INDEX idx_name 
on employees (employee_name)