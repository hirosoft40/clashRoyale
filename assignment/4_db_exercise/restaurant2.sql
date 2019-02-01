-- -- DROP TABLE restaurant, review, reviewer;

-- CREATE TABLE restaurant (
--     id serial PRIMARY KEY
--     , name VARCHAR(30)
--     , address VARCHAR
--     , category VARCHAR
-- );
-- CREATE TABLE reviewer (
--     id serial PRIMARY KEY
--     , name VARCHAR(30)
--     , email VARCHAR
--     , karma INTEGER NOT NULL CHECK (karma >=0 AND karma <=7)
-- );
-- CREATE TABLE review (
--     id serial PRIMARY KEY
--     , reviewer_id INTEGER REFERENCES reviewer (id)
--     , stars INTEGER NOT NULL CHECK (stars >0 AND stars <6)
--     , title VARCHAR
--     , review TEXT
--     , restaurant_id INTEGER REFERENCES restaurant (id)
-- );

-- INSERT INTO restaurant VALUES
-- (DEFAULT, 'Dunkin Donuts', 'Emden Crossroad, 3306', 'Fast Food')
-- , (DEFAULT, 'Wasabi', 'West Road, 9134', 'Japanese')
-- , (DEFAULT, 'Shogun', 'Arbutus Pass, 3312', 'Japanese')
-- , (DEFAULT, 'El Cantina', 'Carlton Grove, 5784', 'Mexican')
-- , (DEFAULT, 'No.1 Burger', 'Betton Lane, 3688', 'American')
-- , (DEFAULT, 'Le Mason', 'Midtown Lane, d100', 'French');

-- INSERT INTO reviewer VALUES
-- (DEFAULT,'Hailey Douglas','Hailey_Douglas2990@famism.biz', 0)
-- , (DEFAULT,'Mason Weasley','Mason_Weasley472@joiniaa.com', 1)
-- , (DEFAULT,'Marvin Exton','Marvin_Exton4547@acrit.org', 2)
-- , (DEFAULT,'Bryon Wooldridge','Bryon_Wooldridge6372@guentu.biz', 3)
-- , (DEFAULT,'Joy Ainsworth','Joy_Ainsworth109@vetan.org', 4)
-- , (DEFAULT,'Mason Squire','Mason_Squire2716@nanoff.biz', 5)
-- , (DEFAULT,'Doug Bennett','Doug_Bennett3190@hourpy.biz', 6)
-- , (DEFAULT,'Mark Redwood','Mark_Redwood7070@eirey.tech', 7)
-- , (DEFAULT,'Leah Wilde','Leah_Wilde6733@kideod.biz', 1)
-- , (DEFAULT,'Harvey Patel','Harvey_Patel6802@dionrab.com', 4);


-- INSERT INTO review VALUES
-- (DEFAULT, 1, 1, 'Never Again','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 1)
-- ,(DEFAULT,2, 4, 'Good Stuff','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 2)
-- ,(DEFAULT,3, 5, 'Wanna go back again','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',3)
-- ,(DEFAULT,10, 5, 'Visited right after','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',4)
-- ,(DEFAULT,3, 1, 'Nope','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',5)
-- ,(DEFAULT,6, 2, 'Arg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 1)
-- ,(DEFAULT,7, 3, 'So so','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 3)
-- ,(DEFAULT,8, 3, 'Hmmm','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',5)
-- ;
-- Answer These Questions With a Query
-- 1.List all the reviews for a given restaurant given a specific restaurant ID.
SELECT * FROM review WHERE restaurant_id = 2;
-- 2.List all the reviews for a given restaurant, given a specific restaurant name.
SELECT * FROM review r
join restaurant res on r.restaurant_id = res.id
WHERE res.name ='Shogun';

-- 3.List all the reviews for a given reviewer, given a specific author name.
SELECT * 
FROM review r
-- join restaurant res on r.restaurant_id = res.id
join reviewer rr on rr.id = r.reviewer_id
WHERE rr.name = 'Hailey Douglas';

-- 4.List all the reviews along with the restaurant they were written for. In the query result, select the restaurant name and the review text.
SELECT 
res.name AS restaurant_name, 
r.review AS review 
FROM review r
join restaurant res on r.restaurant_id = res.id
join reviewer rr on rr.id = r.reviewer_id;


-- 5.Get the average stars by restaurant. The result should have the restaurant name and its average star rating.
SELECT
    res.name
    , ROUND(AVG(r.stars),2) AS average_stars
FROM review r
join restaurant res on r.restaurant_id = res.id
GROUP BY res.name;

-- 6.Get the number of reviews written for each restaurant. The result should have the restaurant name and its review count.
SELECT
    res.name,
    COUNT(r.id) AS No_of_review
FROM review r 
JOIN restaurant res on res.id = r.restaurant_id
GROUP BY res.name;

-- 7.List all the reviews along with the restaurant, and the reviewer's name. The result should have the restaurant name, the review text, and the reviewer name. Hint: you will need to do a three-way join - i.e. joining all three tables together.
SELECT
    res.name,
    r.review,
    rr.name
FROM review r
JOIN restaurant res on res.id = r.restaurant_id
JOIN reviewer rr on rr.id = r.reviewer_id;

-- 8.Get the average stars given by each reviewer. (reviewer name, average star rating)
SELECT
    rr.name,
    ROUND(AVG(r.stars),2) AS average_stars,
    COUNT(r.stars) AS No_of_review
FROM review r
JOIN restaurant res on res.id = r.restaurant_id
JOIN reviewer rr on rr.id = r.reviewer_id
GROUP BY rr.name;

-- 9.Get the lowest star rating given by each reviewer. (reviewer name, lowest star rating)
SELECT
    rr.name,
    MIN(r.stars) AS lowest_stars
FROM review r
JOIN restaurant res on res.id = r.restaurant_id
JOIN reviewer rr on rr.id = r.reviewer_id
GROUP BY rr.name;

-- 10.Get the number of restaurants in each category. (category name, restaurant count)
SELECT
    res.category
    , COUNT(res.name) AS No_of_restaurants
FROM review r
JOIN restaurant res on res.id = r.restaurant_id
JOIN reviewer rr on rr.id = r.reviewer_id
GROUP BY res.category;

-- 11.Get number of 5 star reviews given by restaurant. (restaurant name, 5-star count)
SELECT
    res.name
    , COUNT(res.name) AS Times_of_5stars 
FROM review r
JOIN restaurant res on res.id = r.restaurant_id
JOIN reviewer rr on rr.id = r.reviewer_id
WHERE r.stars = 5
GROUP BY res.name;

-- 12.Get the average star rating for a food category. (category name, average star rating)
SELECT
    res.category
    , ROUND(AVG(r.stars),2) AS average_stars
FROM review r
JOIN restaurant res on res.id = r.restaurant_id
JOIN reviewer rr on rr.id = r.reviewer_id
GROUP BY res.category;