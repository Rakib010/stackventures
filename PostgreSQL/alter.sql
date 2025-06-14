-- View all records from the 'person' table
SELECT * FROM person;

-- Add a new column 'last_name' with default value 'hasan' and set it to NOT NULL
ALTER TABLE person ADD COLUMN last_name VARCHAR(50) DEFAULT 'hasan' NOT NULL;

-- Insert a new record into the 'person' table
INSERT INTO person (nam, email, age, gender, last_name)
VALUES ('Rock', 'rocky@gm.com', 26, 'male', 'hock');

-- Remove the 'email' column from the 'person' table
ALTER TABLE person DROP COLUMN email;

-- Remove the 'last_name' column from the 'person' table
ALTER TABLE person DROP COLUMN last_name;

-- Rename column 'nam' to 'name' in the 'person' table
ALTER TABLE person RENAME COLUMN nam TO name;

-- Change data type of column 'name' to VARCHAR(100)
ALTER TABLE person ALTER COLUMN name TYPE VARCHAR(100);

-- Change it again to VARCHAR(50)
ALTER TABLE person ALTER COLUMN name TYPE VARCHAR(50);

-- Set the 'age' column to NOT NULL (doesn't allow NULL values)
ALTER TABLE person ALTER COLUMN age SET NOT NULL;

-- Remove the NOT NULL constraint from 'age' column (allow NULL again)
ALTER TABLE person ALTER COLUMN age DROP NOT NULL;

-- Add a UNIQUE constraint on 'age' column to ensure unique values
ALTER TABLE person ADD CONSTRAINT unique_person_age UNIQUE (age);

-- Drop the UNIQUE constraint from 'age' column
ALTER TABLE person DROP CONSTRAINT unique_person_age;

-- Delete all rows from 'person' table without removing the table itself
TRUNCATE TABLE person;

-- Delete all rows from 'student' table without dropping the table
TRUNCATE TABLE student;

-- View all records from the 'student' table
SELECT * FROM student;

-- Permanently delete the 'student' table (structure + data)
DROP TABLE student;
