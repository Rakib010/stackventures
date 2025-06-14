/*
A trigger is a database object in PostgreSQL (and other database management systems) that automatically executes a specified set of actions in response to certain database events or conditions. 
*/

-- Table-Level Events:
    -- INSERT, UPDATE, DELETE, TRUNCATE
-- Database-Level Events
    -- Database Startup, Database Shutdown, Connection start and end etc

-- CREATE TRIGGER trigger_name
-- {BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE | DELETE | TRUNCATE}
-- ON table_name
-- [FOR EACH ROW] 
-- EXECUTE FUNCTION function_name();

-- CREATE Trigger TR
-- BEFORE DELETE
-- on user
-- for each row 
-- EXECUTE FUNCTION function_name();

CREATE table my_user (
    user_name VARCHAR(50),
    email VARCHAR(50)
);

INSERT INTO my_user VALUES
 ('sakib','sakib@gmail.com'),
 ('akib','akib@gmail.com');

SELECT * FROM my_user;

SELECT * from delete_user();

CREATE Table delete_user (
    delete_user_name VARCHAR (50),
    deleteAt TIMESTAMP
)

CREATE or REPLACE Function save_delete_user()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$ 
BEGIN
INSERT INTO delete_user VALUES(OLD.user_name,now());
RETURN OLD;
END
$$

CREATE or REPLACE Trigger save_delete_user
BEFORE DELETE
on my_user
for EACH ROW
EXECUTE FUNCTION save_delete_user();


DELETE FROM my_user WHERE user_name = 'sakib';

