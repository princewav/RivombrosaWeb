from flask import send_from_directory, Blueprint, jsonify, render_template
from rivombrosa.marchingegno import comparator


main = Blueprint('main', __name__)


@main.route("/")
def index():
    return render_template('index.html')


@main.route("/tiers")
def tiers():
    return render_template('tiers.html')


@main.route("/<path:path>")
def home(path):
    return send_from_directory('../client/public', path)


@main.route("/get_tiers")
def get_tiers():
    tiers = comparator.get_tiers()
    print(f'Got tiers')
    return jsonify(tiers)
