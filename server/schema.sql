/*******************************************************************************
 * Users 
 ******************************************************************************/

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id integer primary key autoincrement,
    fbtoken text not null,
    lid integer
);

INSERT INTO users(fbtoken, lid) VALUES(
    'faketoken', 
    null 
);

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
    
    lot integer not null,
    current integer not null
);

INSERT INTO lobbies(sport, description, lat, lon, lot, current) VALUES(
    'Soccer',
    'Bring a ball',
    40.2050591,
    -8.4055564,
    5,
    1
);

