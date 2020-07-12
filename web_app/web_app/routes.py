from flask import send_from_directory, Blueprint, jsonify, current_app as app
from web_app.web_app import dao
from rivombrosa.marchingegno import comparator

main = Blueprint('main', __name__)
# Path for our main Svelte page
@main.route("/")
def index():
    return send_from_directory('../client/public', 'index.html')


# Path for all the static files (compiled JS/CSS, etc.)
@main.route("/<path:path>")
def home(path):
    return send_from_directory('../client/public', path)


@main.route("/get_tiers")
def get_tiers():
    tiers = comparator.get_tiers()
    print(f'Got tiers')
    return jsonify(tiers)
