/*******************************************************************************
 * Users 
 ******************************************************************************/

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id integer primary key autoincrement,
    fid big int,
    lid integer
);

INSERT INTO users(fid, lid) VALUES(680229605493388, 1); 
INSERT INTO users(fid, lid) VALUES(1880378588844643, 1); 
INSERT INTO users(fid, lid) VALUES(1336869316386608, 2); 
INSERT INTO users(fid, lid) VALUES(1506856099354386, 3); 

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
    'soccer',
    'Bring a ball',
    40.204158,
    -8.409342,
    5,
    2 
);

INSERT INTO lobbies(sport, description, lat, lon, maximum, current) VALUES(
    'tennis',
    'I am pretty good at tennis',
    40.201420,
    -8.407829,
    2,
    1 
);

INSERT INTO lobbies(sport, description, lat, lon, maximum, current) VALUES(
    'volleyball',
    'Just want to have some fun',
    40.205246,
    -8.420615,
    4,
    1 
);

