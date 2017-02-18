/*******************************************************************************
 * Users 
 ******************************************************************************/

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id integer primary key autoincrement,
    fid big int,
    lid integer
);

INSERT INTO users(fid, lid) VALUES(100005190632219, 1); 
INSERT INTO users(fid, lid) VALUES(1880378588844643, 1); 
INSERT INTO users(fid, lid) VALUES(100001906565844, 2); 

/*******************************************************************************
 * Lobbies 
 ******************************************************************************/

DROP TABLE IF EXISTS lobbies;

CREATE TABLE lobbies(
    id integer primary key autoincrement,
    sport text not null,
    description text not null,
    lat real not null,
    lon real not null,
    maximum integer not null,
    current integer not null
);

INSERT INTO lobbies(sport, description, lat, lon, maximum, current) VALUES(
    'Soccer',
    'Bring a ball',
    40.204158,
    -8.409342,
    5,
    3 
);

INSERT INTO lobbies(sport, description, lat, lon, maximum, current) VALUES(
    'Tennis',
    'I am pretty good at tennis',
    40.201420,
    -8.407829,
    2,
    1 
);

INSERT INTO lobbies(sport, description, lat, lon, maximum, current) VALUES(
    'Volleyball',
    'Just want to have some fun',
    40.205246,
    -8.420615,
    4,
    1 
);

