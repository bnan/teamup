import os
import json
from sqlite3 import dbapi2 as sqlite3
from flask import Flask, request, send_from_directory, jsonify, session, g, redirect, url_for, abort, render_template, flash

app = Flask(__name__, static_url_path='')

app.config.update(
    DATABASE=os.path.join(app.root_path, 'teamup.db'),
    DEBUG=False,
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
)

################################################################################
# Database
################################################################################

def db_connect():
    """Connects to the specific database."""
    def dict_factory(cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d

    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = dict_factory

    return rv

def db_init():
    """Initializes the database."""
    db = db_open()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

@app.cli.command()
def initdb():
    db_init()
    print('Initialized the database.')


def db_open():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = db_connect()
    return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

################################################################################
# API
################################################################################

@app.route('/api/getLobbies', methods=['GET'])
def api_get_lobbies():
    db = db_open()

    lat = float(request.args.get('lat')) if request.args.get('lat') else None
    lon = float(request.args.get('lon')) if request.args.get('lon') else None
    radius = float(request.args.get('radius')) if request.args.get('radius') else None

    if lat and lon and radius:
        lat_range = lat - radius, lat + radius
        lon_range = lon - radius, lon + radius
        cur = db.execute('SELECT * FROM lobbies WHERE (lat BETWEEN ? AND ?) AND (lon BETWEEN ? AND ?)', [lat_range[0], lat_range[1], lon_range[0], lon_range[1]])
    elif lat and lon and not radius:
        cur = db.execute('SELECT * FROM lobbies WHERE lat = ? AND lon = ?', [lat, lon])
    else:
        cur = db.execute('SELECT * FROM lobbies')

    lobbies= cur.fetchall()
    res = { 'lobbies': lobbies }
    return jsonify(**res)

@app.route('/api/postLobby', methods=['POST'])
def api_post_lobby():
    req = request.get_json(force=True)
    db = db_open()

    db.execute('INSERT INTO lobbies(sport, description, lat, lon, maximum, current) VALUES(?, ?, ?, ?, ?, ?)', [req['sport'], req['description'], req['lat'], req['lon'], req['maximum'], req['current']])
    db.commit()

    res = { 'success': 'true' }
    return jsonify(**res)

@app.route('/api/getLobbyByUser', methods=['GET'])
def api_get_lobby_by_user():
    db = db_open()
    uid = request.args.get('fid')

    cur = db.execute('SELECT * FROM users WHERE fid= ?', [uid])
    user = cur.fetchall()[0]

    cur = db.execute('SELECT * FROM lobbies WHERE id = ?', [user['lid']])
    lobby = cur.fetchall()

    res = { 'lobby': lobby }
    return jsonify(**res)

@app.route('/api/leaveLobby', methods=['PUT'])
def api_leave_lobby():
    db = db_open()
    req = request.get_json(force=True)
    
    cur = db.execute('SELECT * FROM lobbies WHERE lat=? AND lon=?', [req['lat'], req['lon']])
    result = cur.fetchall()
    if len(result) == 0:
        res = { 'success': 'false' }
        return jsonify(**res)
    current = result[0]['current']

    if current == 1:
        db.execute('DELETE FROM lobbies WHERE lat=? AND lon=?', [req['lat'], req['lon']])
        db.commit()
    else:
        db.execute('UPDATE lobbies SET current=current-1 WHERE lat=? AND lon=?', [req['lat'], req['lon']])
        db.commit()

    db.execute('UPDATE users SET lid=null WHERE fid=?', [req['fid']])
    db.commit()

    res = { 'success': 'true' }
    return jsonify(**res)
    
@app.route('/api/getUsers', methods=['GET'])
def api_get_users():
    db = db_open()
    
    cur = db.execute('SELECT * FROM users')
    users = cur.fetchall()

    res = { 'users': users }
    return jsonify(**res)

@app.route('/api/postUser', methods=['POST'])
def api_post_user():
    req = request.get_json(force=True)
    db = db_open()

    db.execute('INSERT INTO users(fid, lid) VALUES(?, ?)', [req['fid'], req['lid']])
    db.commit()

    res = { 'success': 'true' }
    return jsonify(**res)

@app.route('/api/getUsersByLobby', methods=['GET'])
def api_get_users_by_lobby():
    db = db_open()
    lid = request.args.get('lid')

    cur = db.execute('SELECT * FROM users WHERE lid = ?', [lid])
    users = cur.fetchall()

    res = { 'users': users }
    return jsonify(**res)

################################################################################
# Client
################################################################################

@app.route('/')
def client_index():
    return open('../client/index.html').read()

@app.route('/login')
def client_login():
    return open('../client/login.html').read()

@app.route('/lobby')
def client_lobby():
    return open('../client/lobby.html').read()

@app.route('/scripts/<path:path>')
def client_scripts(path):
    return send_from_directory('../client/scripts', path)

@app.route('/styles/<path:path>')
def client_styles(path):
    return send_from_directory('../client/styles', path)

@app.route('/images/<path:path>')
def client_images(path):
    return send_from_directory('../client/images', path)

@app.route('/fonts/<path:path>')
def client_fonts(path):
    return send_from_directory('../client/fonts', path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=1337)
