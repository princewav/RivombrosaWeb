from flask import send_from_directory, request, Response, jsonify
from web_app.web_app import app
from web_app.web_app import dao
from rivombrosa.marchingegno import comparator


# Path for our main Svelte page
@app.route("/")
def index():
    return send_from_directory('../client/public', 'index.html')


# Path for all the static files (compiled JS/CSS, etc.)
@app.route("/<path:path>")
def home(path):
    return send_from_directory('../client/public', path)


@app.route("/get_tiers")
def get_tiers():
    print(f'Got tiers')
    return jsonify(comparator.get_tiers())
