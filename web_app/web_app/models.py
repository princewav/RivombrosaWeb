from flask_login import UserMixin
from . import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))


class Bet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    match = db.Column(db.String(100))
    outcome = db.Column(db.String(10))
    league = db.Column(db.String(100))
    date_played = db.Column(db.DateTime())
    coeff = db.Column(db.Float())
    tier = db.Column(db.Integer())
    stake = db.Column(db.Integer())
    odd = db.Column(db.Float())
    esps = db.Column(db.Float())
    success = db.Column(db.Boolean())