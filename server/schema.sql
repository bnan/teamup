/*******************************************************************************
 * Users 
 ******************************************************************************/

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id integer primary key autoincrement,
    fbtoken text not null,
    lid integer
);

INSERT INTO users(fbtoken, lid) VALUES('faketoken', 1); 
INSERT INTO users(fbtoken, lid) VALUES('faketoken2', 1); 
INSERT INTO users(fbtoken, lid) VALUES('faketoken3', 2); 

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

