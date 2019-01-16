
-- ====== PEN AND PAPER EXERCISE

-- DROP TABLE owners, pets;
-- -- SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public';

-- CREATE TABLE owners (
--     id serial PRIMARY KEY,
--     name VARCHAR(10)
-- );

-- CREATE TABLE pets(
--     id serial PRIMARY KEY,
--     name VARCHAR(10),
--     owner_id INTEGER REFERENCES owners (id)
-- );


-- INSERT INTO owners VALUES
--  (DEFAULT, 'Hiroko')
-- ,(DEFAULT, 'David')
-- ,(DEFAULT, 'Family1')
-- ,(DEFAULT, 'Family2')
-- ,(DEFAULT, 'Family3')
-- ,(DEFAULT, 'Family4')  
--  ;


-- INSERT INTO pets VALUES
-- (DEFAULT, 'Stella',  1)
-- ,(DEFAULT, 'Francis', 1)
-- ,(DEFAULT, 'Mike', 2)
-- ,(DEFAULT, 'Potato', 3)
-- ,(DEFAULT, 'Shiro', 5)
-- ,(DEFAULT, 'Kuro', 5)
-- ,(DEFAULT, 'Meow', NULL)
-- ,(DEFAULT, 'Bow', NULL);

-- SELECT * FROM owners o
-- LEFT JOIN pets p on o.id = p.owner_id;

-- SELECT * FROM owners o
-- INNER JOIN pets p on o.id = p.owner_id;

-- SELECT * FROM owners o
-- RIGHT JOIN pets p on o.id = p.owner_id;

-- SELECT * FROM pets p
-- LEFT JOIN owners o on o.id = p.owner_id;

-- SELECT * FROM pets p
-- INNER JOIN owners o on o.id = p.owner_id;

-- SELECT * FROM pets p
-- RIGHT JOIN owners o on o.id = p.owner_id;


