import json
from pathlib import Path
from datetime import datetime
from flask import current_app as app
from .models import Bet
from . import db


def save_bet(bet_data):
    bet = Bet(
        date_played=datetime.now(),
        match=bet_data['match'],
        outcome=bet_data['outcome'],
        league=bet_data['league'],
        coeff=bet_data['coeff'],
        tier=bet_data['tier'],
        stake=bet_data['stake'],
        odd=bet_data['marathon'],
        esps=bet_data['esps'],
        success=None,
    )
    db.session.add(bet)
    db.session.commit()
    print(Bet.query.all())
