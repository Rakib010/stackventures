CREATE Table "user" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(25) NOT NULL
)

CREATE Table post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user"(id)
)

INSERT INTO "user" (user_name) VALUES 
('Sakib'),
('Sami'),
('Fahim');

SELECT * FROM "user"

INSERT INTO post (title, user_id) VALUES 
('Learning PostgreSQL is fun!', 1),
('Exploring SQL Joins', 2),
('Understanding Foreign Keys', 1),
('Group By and Having in SQL', 3),
('Triggers and Functions in PostgreSQL', 2);


SELECT * FROM post;
SELECT * FROM "user";


-- Deletion constraint on DELETE user
-- Restrict Deletion -> ON DELETE RESTRICT / ON DELETE NO ACTION (default)
-- Cascading Deletion -> ON DELETE CASCADE
-- Setting NULL -> ON DELETE SET NULL
-- Set Default value -> ON DELETE SET DEFAULT

-- Cascading Deletion -> ON DELETE CASCADE
DROP TABLE post;
DROP TABLE "user";

CREATE Table post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE
);
CREATE Table "user" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(25) NOT NULL
)

delete FROM "user"
 WHERE id = 1;

-- Set Default value -> ON DELETE SET DEFAULT
CREATE Table post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL
);
CREATE Table "user" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(25) NOT NULL
)

delete FROM "user"
 WHERE id = 1;

-- Set Default value -> ON DELETE SET DEFAULT
CREATE Table post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user"(id) ON DELETE SET DEFAULT DEFAULT 3
);
CREATE Table "user" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(25) NOT NULL
)

delete FROM "user"
 WHERE id = 1;
