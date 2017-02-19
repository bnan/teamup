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

@app.route('/api/getNearbyLobbies', methods=['GET'])
def api_get_nearby_lobbies():
    try:
        lat = float(request.args.get('lat')) if request.args.get('lat') else None
        lon = float(request.args.get('lon')) if request.args.get('lon') else None
        radius = float(request.args.get('radius')) if request.args.get('radius') else None

        db = db_open()
        if radius:
            between = [lat-radius, lat+radius, lon-radius, lon+radius]
            cur = db.execute('SELECT * FROM lobbies WHERE (lat BETWEEN ? AND ?) AND (lon BETWEEN ? AND ?)', between)
        else:
            cur = db.execute('SELECT * FROM lobbies')

        lobbies = cur.fetchall()
        res = { 'success': True, 'lobbies': lobbies }
    except:
        lobbies = []
        res = { 'success': False, 'lobbies': lobbies }

    return jsonify(**res)

@app.route('/api/getLobby', methods=['GET'])
def api_get_lobby():
    try:
        lat = float(request.args.get('lat')) if request.args.get('lat') else None
        lon = float(request.args.get('lon')) if request.args.get('lon') else None

        db = db_open()
        cur = db.execute('SELECT * FROM lobbies WHERE lat = ? AND lon = ?', [lat, lon])

        lobby = cur.fetchall()
        res = { 'success': True, 'lobby': lobby }
    except:
        lobby = {}
        res = { 'success': False, 'lobby': lobby }

    return jsonify(**res)

@app.route('/api/postLobby', methods=['POST'])
def api_post_lobby():
    try:
        req = request.get_json(force=True)

        db = db_open()
        db.execute('INSERT INTO lobbies(sport, description, lat, lon, maximum, current) VALUES(?, ?, ?, ?, ?, ?)', [req['sport'], req['description'], req['lat'], req['lon'], req['maximum'], req['current']])
        db.commit()

        cur = db.execute('SELECT * FROM lobbies WHERE lat=? AND lon=?', [req['lat'], req['lon']])
        lid = cur.fetchall()[0]['id']
        db.execute('UPDATE users SET lid=? WHERE fid=?', [lid, req['fid']])
        db.commit()
        res = { 'success': True }
    except:
        res = { 'success': False }

    return jsonify(**res)

@app.route('/api/joinLobby', methods=['PUT'])
def api_join_lobby():
    try:
        req = request.get_json(force=True)

        db = db_open()
        cur = db.execute('SELECT * FROM lobbies WHERE lat=? AND lon=?', [req['lat'], req['lon']])
        result = cur.fetchall()

        if len(result) > 0:
            lid = result[0]['id']
            current = result[0]['current']
            maximum = result[0]['maximum']
            
            print('CHECKING', current, maximum)
            if current < maximum:
                cur = db.execute('SELECT * FROM users WHERE fid=? AND lid=?', [req['fid'], lid])
                result = cur.fetchall()
                print('PIKACHU', result)
                if len(result) == 0:

                    print('INCREMENTING')
                    db.execute('UPDATE lobbies SET current=current+1 WHERE lat=? AND lon=?', [req['lat'], req['lon']])
                    db.commit()
                    db.execute('UPDATE users SET lid=? WHERE fid=?', [lid, req['fid']])
                    db.commit()
                    res = { 'success': True }
                else:
                    print('youre already in the lobby dude')
                    res = { 'success': False }
            else:
                print('lobby is fkn full')
                res = { 'success': False }
        else:
            print('lol doesnt exist')
            res = { 'success': False }
    except Exception as e:
        print('error xd', e)
        res = { 'success': False }

    return jsonify(**res)

@app.route('/api/leaveLobby', methods=['PUT'])
def api_leave_lobby():
    req = request.get_json(force=True)

    try:
        db = db_open()
        cur = db.execute('SELECT * FROM lobbies WHERE lat=? AND lon=?', [req['lat'], req['lon']])
        result = cur.fetchall()
        current = result[0]['current']

        if current == 1:
            db.execute('DELETE FROM lobbies WHERE lat=? AND lon=?', [req['lat'], req['lon']])
            db.commit()
        else:
            db.execute('UPDATE lobbies SET current=current-1 WHERE lat=? AND lon=?', [req['lat'], req['lon']])
            db.commit()

        db.execute('UPDATE users SET lid=null WHERE fid=?', [req['fid']])
        db.commit()

        res = { 'success': True }
    except:
        res = { 'success': False }

    return jsonify(**res)

@app.route('/api/getLobbyByUser', methods=['GET'])
def api_get_lobby_by_user():
    try:
        fid = int(request.args.get('fid'))

        db = db_open()
        cur = db.execute('SELECT * FROM users WHERE fid= ?', [fid])
        user = cur.fetchall()[0]

        cur = db.execute('SELECT * FROM lobbies WHERE id = ?', [user['lid']])
        lobby = cur.fetchall()

        res = { 'success': False, 'lobby': lobby }
    except:
        lobby = {}
        res = { 'success': False, 'lobby': lobby }

    return jsonify(**res)

@app.route('/api/getUsers', methods=['GET'])
def api_get_users():
    try:
        db = db_open()
        cur = db.execute('SELECT * FROM users')
        users = cur.fetchall()
        res = { 'success': True, 'users': users }
    except:
        users = {}
        res = { 'success': False, 'users': users }

    return jsonify(**res)

@app.route('/api/postUser', methods=['POST'])
def api_post_user():
    try:
        req = request.get_json(force=True)
        db = db_open()
        cur = db.execute('SELECT * FROM users WHERE fid=?', [req['fid']])
        result = cur.fetchall()
        if len(result) == 0:
            db.execute('INSERT INTO users(fid, lid) VALUES(?, ?)', [req['fid'], req['lid']])
            db.commit()
            res = { 'success': True }
        else:
            res = { 'success': False }
    except:
        res = { 'success': False }

    return jsonify(**res)

@app.route('/api/getUsersByLobby', methods=['GET'])
def api_get_users_by_lobby():
    try:
        lid = request.args.get('lid')

        db = db_open()
        cur = db.execute('SELECT * FROM users WHERE lid = ?', [lid])

        users = cur.fetchall()
        res = { 'users': users }
    except:
        users = {}
        res = { 'success': False, 'users': users }

    return jsonify(**res)

################################################################################
# Client
################################################################################

@app.route('/')
def client_index():
    return open('../client/index.html').read()

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
