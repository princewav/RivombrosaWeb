from flask import send_from_directory, Blueprint, jsonify, render_template, request, Response
from rivombrosa.marchingegno import comparator
from . import dao


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


@main.route("/save_bet", methods=['POST'])
def save_bet():
    payload = request.json
    dao.save_bet(payload)
    print(f'Saving bet')
    print(payload)
    return Response(status=201)
