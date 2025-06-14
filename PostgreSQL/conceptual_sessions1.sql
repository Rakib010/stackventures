-- Active: 1747403020254@@127.0.0.1@5432@ph

-- ALTER Keyword
-- SELECT Queries
-- WHERE Clause
-- Scalar and Aggregate
-- BETWEEN, LIKE, IN, ILIKE
-- Pagination with LIMIT and OFFSET
-- Update Operator
-- Grouping
-- Foreign key deletion
-- INNER JOIN
-- FULL JOIN
-- Date and Date Functions

CREATE Table publishers (
    id SERIAL PRIMARY key,
    name VARCHAR(25) NOT NULL
);
create TABLE books(
    id SERIAL PRIMARY key,
    title text NOT NULL,
    author_name text,
    published_year INT,
    price NUMERIC(6,2),
    in_stock BOOLEAN,
    p_id INT,
    FOREIGN KEY(p_id) REFERENCES publishers(id)
);

INSERT INTO publishers (name)
 VALUES 
('Penguin Books'),
('HarperCollins'),
('Bloomsbury'),
('Oxford University Press');

INSERT INTO books (title, author_name, published_year, price, in_stock, p_id)
 VALUES
('The Hobbit', 'J.R.R. Tolkien', 1937, 250.00, true, 1),
('Harry Potter and the Philosophers Stone', 'J.K. Rowling', 1997, 300.00, true, 3),
('To Kill a Mockingbird', 'Harper Lee', 1960, 180.00, false, 2),
('1984', 'George Orwell', 1949, 220.00, true, 1),
('Animal Farm', 'George Orwell', 1945, 150.00, true, 4),
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 200.00, false, 1),
('Brave New World', 'Aldous Huxley', 1932, 230.00, true, NULL); 

SELECT * FROM publishers;
SELECT * FROM books;


ALTER Table books ADD COLUMN genre VARCHAR(25);
ALTER Table books DROP COLUMN genre;

ALTER Table books ADD COLUMN in_stock BOOLEAN DEFAULT true;

ALTER Table books RENAME COLUMN author_name to author;

SELECT * FROM books WHERE in_stock = true;

SELECT * FROM books where author = 'J.R.R. Tolkien';

SELECT title,length(title) FROM books;
SELECT count(*) FROM books;

SELECT round(avg(price)) FROM books;

SELECT Max(price), min(price) from books;


SELECT * FROM books WHERE price BETWEEN 150 AND 200 ORDER BY price ASC;

SELECT * FROM books WHERE title ILIKE 't%';

SELECT * FROM books WHERE author IN ('Harper Lee','J.R.R. Tolkien');

SELECT * FROM books LIMIT 5 OFFSET 5*0;
SELECT * FROM books LIMIT 5 OFFSET 5*1;
SELECT * FROM books LIMIT 5 OFFSET 5*2;

UPDATE books set price = price * 1.10 WHERE  id = 3;


SELECT author, count(*) from books GROUP BY author;

SELECT author, count(*) from books 
GROUP BY author
HAVING count(*) > 3;


ALTER TABLE books DROP constraint books_p_id_fkey;

ALTER Table books add constraint books_p_id_fkey FOREIGN KEY(p_id) REFERENCES publishers(id) ON Delete CASCADE;

DELETE FROM publishers WHERE id = 4;
SELECT * FROM books;
SELECT * FROM publishers;


-- `SELECT`--> কোন কোন কলাম দেখাবো            
-- `FROM` --> কোন টেবিল থেকে শুরু করবো       
-- `JOIN` --> কোন টেবিলের সাথে যুক্ত করবো    
-- `ON` -->কোন শর্তে দুই টেবিল match করবে 

SELECT books.title, publishers.name FROM books 
INNER JOIN publishers ON books.p_id = publishers.id;
SELECT books.title, publishers.name FROM books 
LEFT JOIN publishers ON books.p_id = publishers.id;
SELECT books.title, publishers.name FROM books 
RIGHT JOIN publishers ON books.p_id = publishers.id;
SELECT books.title, publishers.name FROM books 
FULL JOIN publishers ON books.p_id = publishers.id;


-- Date
SELECT  current_time;
SELECT  current_Date;

SELECT 
EXTRACT (YEAR FROM current_date),
EXTRACT (MONTH FROM current_date),
EXTRACT (DAY FROM current_date);









