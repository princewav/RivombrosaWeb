from datetime import datetime

from . import db
from .models import Bet

months_literals = {
    1: 'Gen', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'Mag', 6: 'Giu',
    7: 'Lug', 8: 'Ago', 9: 'Set', 10: 'Ott', 11: 'Nov', 12: 'Dec',
}


def save_bet(bet_data):
    bet = Bet(
        date_played=f'{datetime.now().day} {months_literals[datetime.now().month]} {datetime.now().year}',
        match=bet_data['match'],
        outcome=bet_data['outcome'],
        league=bet_data['league'],
        coeff=bet_data['coeff'],
        tier=bet_data['tier'],
        stake=bet_data['stake'],
        odds=bet_data['odds'],
        esps=bet_data['esps'],
        success=None,
    )
    db.session.add(bet)
    db.session.commit()


def load_bets():
    return list(reversed([x.as_dict() for x in Bet.query.all()]))
