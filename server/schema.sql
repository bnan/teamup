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
INSERT INTO users(fid, lid) VALUES(100006175597255, 1); 
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
    41.205091,
    -8.4055564,
    5,
    2 
);

INSERT INTO lobbies(sport, description, lat, lon, maximum, current) VALUES(
    'Tennis',
    'I fucking hate tennis',
    40.2050591,
    -7.405564,
    2,
    1 
);

