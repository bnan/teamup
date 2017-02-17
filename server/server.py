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
# API
################################################################################

@app.route('/api/lobbies', methods=['GET'])
def api_lobies():
    res = { 'foo': 'bar' }
    return jsonify(res)

################################################################################
# Client
################################################################################

@app.route('/')
def client_index():
    return open('../client/index.html').read()

@app.route('/login')
def client_login():
    return open('../client/login.html').read()

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
    app.run()
