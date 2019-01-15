
-- SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public';
-- SELECT * FROM project;
-- SELECT * from project_uses_tech LIMIT 2;
-- SELECT * FROM tech;

-- ====== ASSIGNMENT JOIN =======
-- 1. What are all projects that use JavaScript?
SELECT * FROM project_uses_tech pu
    INNER JOIN project p ON pu.project_id = p.id
    INNER JOIN tech t ON pu.tech_id = t.id
    WHERE t.name LIKE '%Script';

-- -- SELECT * FROM project_uses_tech WHERE tech_id = 3;

-- -- 2. What are all technologies used by the Personal Website?
SELECT t.name AS language FROM project_uses_tech pu
    INNER JOIN tech t ON pu.tech_id = t.id
    INNER JOIN project p ON pu.project_id = p.id
    WHERE p.name = 'Personal Website';

-- -- 3. Perform a left outer join from the tech table to the project_uses_tech table - which techs has no associated project?
SELECT * FROM tech t 
    LEFT OUTER JOIN project_uses_tech pu ON t.id = pu.tech_id;

-- 4. Based on the previous query, get the count of the number of techs used by each project.
SELECT p.name, COUNT(pu.tech_id) AS num_of_tech FROM tech t
    LEFT OUTER JOIN project_uses_tech pu ON t.id = pu.tech_id
    JOIN project p ON p.id = pu.project_id
    GROUP BY p.name
    ORDER BY p.name;

-- -- 5. Perform a left outer join from the project table to the project_user_tech table - which projects has no associated tech?
SELECT * FROM project p
     LEFT OUTER JOIN project_uses_tech pu ON p.id = pu.project_id;

-- -- 6. Based on the previous query, get the count of the number of projects that use each tech.
SELECT DISTINCT(t.name), COUNT(t.id) FROM tech t
    INNER JOIN project_uses_tech pu ON t.id = pu.tech_id
    INNER JOIN project p ON p.id = pu.project_id
    GROUP BY t.name;

-- 7. List all projects along with each technology used by it. You will need to do a three-way join.
SELECT 
    p.name
    , t.name
FROM project_uses_tech pu
JOIN tech t ON t.id = pu.tech_id
JOIN project p ON p.id = pu.project_id;

-- 8. List all the distinct techs that are used by at least one project.
SELECT DISTINCT(t.name) FROM project_uses_tech pu 
    INNER JOIN project p ON p.id = pu.project_id
    INNER JOIN tech t ON t.id = pu.tech_id
    GROUP BY t.name

-- 9. List all the distinct techs that are not used by any projects.
SELECT DISTINCT(t.name) FROM project_uses_tech pu 
    LEFT OUTER JOIN project p ON p.id = pu.project_id
    RIGHT OUTER JOIN tech t ON t.id = pu.tech_id
WHERE pu.tech_id IS NULL
GROUP BY t.name;


-- -- 10. List all the distinct projects that use at least one tech.
 SELECT DISTINCT(p.name) FROM project_uses_tech pu 
    INNER JOIN project p ON p.id = pu.project_id
    INNER JOIN tech t ON t.id = pu.tech_id
    WHERE pu.tech_id IS NOT NULL
    GROUP BY p.name;


-- -- 11. List all the distinct projects that use no tech.
 SELECT DISTINCT(p.name) FROM project_uses_tech pu 
    FULL OUTER JOIN project p ON p.id = pu.project_id
    LEFT OUTER JOIN tech t ON t.id = pu.tech_id
    WHERE t.name IS NULL
    GROUP BY p.name;

-- -- 12. Order the projects by how many tech it uses.
 SELECT COUNT(t.name), p.name FROM project_uses_tech pu 
    INNER JOIN project p ON p.id = pu.project_id
    INNER JOIN tech t ON t.id = pu.tech_id
    GROUP BY p.name
    ORDER BY 1 DESC;

-- -- 13. Order the tech by how many projects use it.
SELECT t.name, COUNT(p.name) FROM project_uses_tech pu
    INNER JOIN project p ON p.id = pu.project_id
    INNER JOIN tech t ON t.id = pu.tech_id
    GROUP BY t.name
    ORDER BY 2 DESC;

-- 14. What is the average number of techs used by a project?
SELECT 
    avg(avg_tech) AS average_num_tech
FROM 
    (SELECT p.name, 
    COUNT(t.name) AS avg_tech FROM project_uses_tech pu
    INNER JOIN project p ON p.id = pu.project_id
    INNER JOIN tech t ON t.id = pu.tech_id
    GROUP BY p.name
    ORDER BY 2 DESC) a;


-- -- PostgreSQL database dump
-- --

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SET check_function_bodies = false;
-- SET client_min_messages = warning;

-- --
-- -- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
-- --

-- CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


-- --
-- -- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
-- --

-- COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


-- SET search_path = public, pg_catalog;

-- SET default_tablespace = '';

-- SET default_with_oids = false;

-- --
-- -- Name: project; Type: TABLE; Schema: public; Owner: airportyh; Tablespace:
-- --

-- CREATE TABLE project (
--     id integer NOT NULL,
--     name character varying
-- );



-- --
-- -- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: airportyh
-- --

-- CREATE SEQUENCE project_id_seq
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;



-- --
-- -- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: airportyh
-- --

-- ALTER SEQUENCE project_id_seq OWNED BY project.id;


-- --
-- -- Name: project_uses_tech; Type: TABLE; Schema: public; Owner: airportyh; Tablespace:
-- --

-- CREATE TABLE project_uses_tech (
--     project_id integer,
--     tech_id integer
-- );



-- --
-- -- Name: tech; Type: TABLE; Schema: public; Owner: airportyh; Tablespace:
-- --

-- CREATE TABLE tech (
--     id integer NOT NULL,
--     name character varying
-- );



-- --
-- -- Name: tech_id_seq; Type: SEQUENCE; Schema: public; Owner: airportyh
-- --

-- CREATE SEQUENCE tech_id_seq
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;



-- --
-- -- Name: tech_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: airportyh
-- --

-- ALTER SEQUENCE tech_id_seq OWNED BY tech.id;


-- --
-- -- Name: id; Type: DEFAULT; Schema: public; Owner: airportyh
-- --

-- ALTER TABLE ONLY project ALTER COLUMN id SET DEFAULT nextval('project_id_seq'::regclass);


-- --
-- -- Name: id; Type: DEFAULT; Schema: public; Owner: airportyh
-- --

-- ALTER TABLE ONLY tech ALTER COLUMN id SET DEFAULT nextval('tech_id_seq'::regclass);


-- --
-- -- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: airportyh
-- --

-- COPY project (id, name) FROM stdin;
-- 1	School Bus
-- 2	Medium Blog Layout
-- 3	Mozilla Front Page
-- 4	Personal Website
-- 5	Modal Dialog
-- 6	CSS Tricks Blog Layout
-- 7	Whiteboard Exercises
-- 8	RPG Hero Game
-- 9	Catch the Monster Game
-- 10	Phone Book
-- 11	Turtle Graphics Exercises
-- \.


-- --
-- -- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: airportyh
-- --

-- SELECT pg_catalog.setval('project_id_seq', 11, true);


-- --
-- -- Data for Name: project_uses_tech; Type: TABLE DATA; Schema: public; Owner: airportyh
-- --

-- COPY project_uses_tech (project_id, tech_id) FROM stdin;
-- 1	1
-- 1	2
-- 2	1
-- 2	2
-- 3	1
-- 3	2
-- 3	9
-- 4	1
-- 4	2
-- 5	1
-- 5	2
-- 6	1
-- 6	2
-- 8	4
-- 9	4
-- 9	6
-- 10	4
-- 11	4
-- 11	5
-- 8	10
-- 9	10
-- 10	11
-- 10	12
-- \.


-- --
-- -- Data for Name: tech; Type: TABLE DATA; Schema: public; Owner: airportyh
-- --

-- COPY tech (id, name) FROM stdin;
-- 1	HTML
-- 2	CSS
-- 3	JavaScript
-- 4	Python
-- 5	Turtle Graphics
-- 6	PyGame
-- 7	Java
-- 8	Ruby
-- 9	Bootstrap
-- 10	Objects
-- 11	File IO
-- 12	Pickle
-- \.


-- --
-- -- Name: tech_id_seq; Type: SEQUENCE SET; Schema: public; Owner: airportyh
-- --

-- SELECT pg_catalog.setval('tech_id_seq', 12, true);


-- --
-- -- Name: project_pkey; Type: CONSTRAINT; Schema: public; Owner: airportyh; Tablespace:
-- --

-- ALTER TABLE ONLY project
--     ADD CONSTRAINT project_pkey PRIMARY KEY (id);


-- --
-- -- Name: tech_pkey; Type: CONSTRAINT; Schema: public; Owner: airportyh; Tablespace:
-- --

-- ALTER TABLE ONLY tech
--     ADD CONSTRAINT tech_pkey PRIMARY KEY (id);


-- --
-- -- Name: project_uses_tech_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: airportyh
-- --

-- ALTER TABLE ONLY project_uses_tech
--     ADD CONSTRAINT project_uses_tech_project_id_fkey FOREIGN KEY (project_id) REFERENCES project(id);


-- --
-- -- Name: project_uses_tech_tech_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: airportyh
-- --

-- ALTER TABLE ONLY project_uses_tech
--     ADD CONSTRAINT project_uses_tech_tech_id_fkey FOREIGN KEY (tech_id) REFERENCES tech(id);


-- --
-- -- Name: public; Type: ACL; Schema: -; Owner: airportyh
-- --

-- REVOKE ALL ON SCHEMA public FROM PUBLIC;
-- GRANT ALL ON SCHEMA public TO PUBLIC;


-- --
-- -- PostgreSQL database dump complete
-- --

