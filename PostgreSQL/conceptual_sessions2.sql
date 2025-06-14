-- Active: 1747403020254@@127.0.0.1@5432@conceptual2@public

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

-- cross Join
SELECT b.title, b.author_name, p.name FROM books b CROSS JOIN publishers p;

-- NATURAL JOIN
ALTER Table publishers Add COLUMN p_id SERIAL;
SELECT * FROM books NATURAL JOIN publishers;

-- row by row gele scaler 
-- subqueries
SELECT title,price,author_name FROM books
WHERE price > ( SELECT avg(price) FROM books );


SELECT title, author_name, price 
FROM books
WHERE (price, id) = (
  SELECT MAX(price), MIN(id) 
  FROM books
);

SELECT name FROM publishers WHERE id In (
    SELECT p_id FROM books GROUP BY p_id HAVING count (*) > 1
);


