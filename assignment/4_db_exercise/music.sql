CREATE TABLE artists(
    id serial PRIMARY KEY,
    name VARCHAR
);


CREATE TABLE albums(
    id serial PRIMARY KEY
    , title VARCHAR(100)
    , song_id integer REFERENCES songs (id)
    , no_of_tracks integer
    , released_on DATE
    , artists_id integer REFERENCES artists (id)
);

CREATE TABLE tracks(
    album_id integer REFERENCES albums (id)
    , tracks_no integer REFERENCES songs (tracks_no)
);

CREATE TABLE songs(
    title VARCHAR
    , artists_id integer REFERENCES artists (id)
    , writer_id integer REFERENCES song_writer (id)
    , time_of_song TIME
    , album_id integer REFERENCES albums (id)
    , track_no as integer
    , recorderd_on as DATE
);


CREATE TABLE song_writer(
    id serial PRIMARY KEY,
    name VARCHAR(30),
    song_id integer REFERENCES songs (id)
);

-- What are tracks for a given album?
SELECT a.title, s.title, s.track_no FROM tracks t
JOIN albums a on t.album_id = a.id
JOIN songs s on t.song_id = s.id
WHERE a.title LIKE '%222222%'
;


-- What are the albums produced by a given artist?
SELECT * FROM albums a
JOIN artists ar ON a.artists_id = ar.id
;

-- What is the track with the longest duration?
SELECT MAX(time), title FROM songs;

-- What are the albums released in the 60s? 70s? 80s? 90s?


-- How many albums did a given artist produce in the 90s?
SELECT a.title, ar.name, COUNT(a.id) FROM album a
JOIN artists ar on ar.album_id = a.id
HAVING a.released_on BETWEEN '1990-01-01'n to '1999-12-31'

;
-- What is each artist's latest album?
SELECT a.title, ar.name FROM album a
JOIN artists ar on ar.album_id = a.id
ORDER BY a.released_on DESC LIMIT 1
-- List all albums along with its total duration based on summing the duration of its tracks.
SELECT a.*, SUM(s.time) FROM album a
JOIN songs s ON s.album_id = a.id;

-- What is the album with the longest duration?
SELECT a.*, SUM(s.time) FROM album a
JOIN songs s ON s.album_id = a.id;
ORDER BY 2 DESC LIMIT 1

-- Who are the 5 most prolific artists based on the number of albums they have recorded?
SELECT ar.name, COUNT(a.id) FROM artists ar
JOIN albums a ON a.artists_id = ar.id
;

-- What are all the tracks a given artist has recorded?
SELECT ar.name, s.title FROM songs s
JOIN artists ar on ar.id = s.artists_id
;

-- What are the top 5 most often recorded songs?
SELECT * FROM songs
ORDER BY recorderd_on DESC LIMIT 5
;

-- Who are the top 5 song writers whose songs have been most often recorded?
SELECT sw.name, COUNT(s.id) FROM song_writer sw
JOIN songs s ON sw.id = s.writer_id
GROUP BY sw.name
ORDER BY 2
;

-- Who is the most prolific song writer based on the number of songs he has written?
SELECT sw.name, COUNT(s.id) FROM song_writer sw
JOIN songs s ON sw.id = s.writer_id
GROUP BY sw.name
ORDER BY 2 DESC LIMIT 1
;

-- What songs has a given artist recorded?
SELECT ar.name, * FROM songs s 
JOIN artists ar ON s.artists_id = ar.id
;

-- Who are the song writers whose songs a given artist has recorded?
SELECT sw.name FROM song_writer sw
JOIN songs s ON sw.id = s.writer_id
JOIN artists ar ON ar.id = s.artists_id
WHERE ar.name ILIKE '%9999%' AND s.recorderd_on IS NOT NULL;

-- Who are the artists who have recorded a given song writer's songs?
SELECT ar.name FROM song_writer sw
JOIN songs s ON sw.id = s.writer_id
JOIN artists ar ON ar.id = s.artists_id
WHERE sw.name ILIKE '%9999%' AND s.recorderd_on IS NOT NULL;
