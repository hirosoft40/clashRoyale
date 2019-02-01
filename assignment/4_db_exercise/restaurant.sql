DROP TABLE restaurants;
CREATE TABLE restaurants (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR,
    distance INTEGER,
    stars REAL,
    category VARCHAR,
    favourite_dish VARCHAR,
    takeout BOOLEAN,
    last_eaten date
);

INSERT INTO restaurants VALUES
(
    DEFAULT, 'Moon Tower Inn', 3, 4.6, 'American', 'Burger', TRUE, '2018-12-01'
),
(
    DEFAULT, 'The Original Ninfas on Navigation', 6, 5.0, 'Mexican', 'Taco', TRUE, '2018-11-01'
),
(
    DEFAULT, 'El Tiempo Cantina - Navigation', 7, 4.4, 'Tex-Mex', 'Some Meat', FALSE, '2018-12-11'
),
(
    DEFAULT, 'Restaurante Monte Cristo', 8, 5.0, 'American', 'Burger', TRUE, '2018-12-21'
),
(
    DEFAULT, 'Merida Mexican Restaurant', 5, 4.2, 'Mexican', 'Breakfast Taco', FALSE, '2018-12-13'
),
(
    DEFAULT, 'Champ Burger', 1, 4.7, 'American', 'Burger', TRUE, '2018-12-31'
),
(
    DEFAULT, 'Huynh Restaurant', 4, 5.0, 'Vietnamese', 'Pho', TRUE, '2018-12-27'
),
(
    DEFAULT, 'Texas Bar-B-Que House', 2, 5.0, 'BBQ', 'Rib', FALSE, '2018-12-17'
),
(
    DEFAULT, 'Lenox Barbecue & Catering', 10, 5.0, 'BBQ', 'Sausage', TRUE, '2018-12-07'
);


-- 1. The names of the restaurants that you gave a 5 stars to
SELECT * FROM restaurants WHERE stars = 5.0;

-- 2. The favorite dishes of all 5-star restaurants
SELECT favourite_dish FROM restaurants WHere stars = 5.0;

-- 3. The the id of a restaurant by a specific restaurant name, say 'Moon Tower'
SELECT id, name FROM restaurants WHERE name LIKE 'Moon%';

-- 4. restaurants in the category of 'BBQ'
SELECT * FROM restaurants WHERE category = 'BBQ';

-- 5. restaurants that do take out
SELECT * FROM restaurants WHERE takeout = TRUE;

-- 6. restaurants that do take out and is in the category of 'BBQ'
SELECT * FROM restaurants WHERE category = 'BBQ' AND takeout = TRUE;

-- 7. restaurants within 2 miles
SELECT * FROM restaurants WHERE distance <= 2;

-- 8. restaurants you haven't ate at in the last week
SELECT * FROM restaurants WHERE last_eaten < '2019-01-07';

-- 9. restaurants you haven't ate at in the last week and has 5 stars
SELECT * FROM restaurants WHERE last_eaten < '2019-01-07' AND stars = 5;

-- Aggregation and Sorting Queries
-- 2-1. list restaurants by the closest distance.
SELECT * FROM restaurants ORDER BY distance;

-- 2-2. list the top 2 restaurants by distance.
SELECT * FROM restaurants ORDER BY distance DESC LIMIT 2; -- FURTHER
SELECT * FROM restaurants ORDER BY distance ASC LIMIT 2; -- CLOSEST

-- 2-3. list the top 2 restaurants by stars.
SELECT * FROM restaurants ORDER BY stars DESC LIMIT 2;

-- 2-4. list the top 2 restaurants by stars where the distance is less than 2 miles.
SELECT * FROM restaurants WHERE distance <= 2 ORDER BY stars DESC LIMIT 2;

-- 2-5. count the number of restaurants in the db.
SELECT COUNT(*) FROM restaurants;

-- 2-6. count the number of restaurants by category.
SELECT COUNT(category) FROM restaurants;

-- 2-7. get the average stars per restaurant by category.
SELECT ROUND(AVG(stars)::numeric, 2) FROM restaurants GROUP BY category;

-- 2-8. get the max stars of a restaurant by category.
SELECT MAX(stars), category FROM restaurants GROUP BY category;
