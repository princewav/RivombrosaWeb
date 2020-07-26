from pprint import pprint

from rivombrosa.config import urls_per_league, leagues, BUDGET
from rivombrosa.marchingegno.shin import get_real_odds, calcola_kelly, calcola_e
from rivombrosa.sites.pinnacle import get_prices as get_pinnacle_prices
from rivombrosa.sites.marathon import get_prices as get_marathon_prices
from rivombrosa.sites.bet import get_prices as get_bet_prices


def get_tiers(book, prices_to_play_method):
    tiers = {x: {'tier_1': [], 'tier_2': [], 'tier_3': []} for x in leagues}

    for league, urls in urls_per_league.items():
        pinnacle_data = get_pinnacle_prices(urls['pinnacle'])
        to_play_data = prices_to_play_method(urls[book])

        for match, pinnacle_odds in pinnacle_data.items():
            if pinnacle_odds:
                to_play_odds = to_play_data.get(match)
                real_odds = get_real_odds(pinnacle_odds)

                if to_play_odds:
                    data = {
                        outcome: {
                            'match': match,
                            'league': league,
                            'outcome': outcome,
                            'date': to_play_odds['date'],
                            'odds': to_play_odds[outcome],
                            'pinnacle': pinnacle_odds[outcome],
                            'coeff': round((1 / real_odds[outcome] - 1 / to_play_odds[outcome]) * 100, 3),
                            'stake': int(round(calcola_kelly(BUDGET, to_play_odds[outcome], real_odds[outcome]))) * 2,
                            'esps': round(calcola_e(20, to_play_odds[outcome], real_odds[outcome]), 3),
                        } for outcome in ('1', 'X', '2')
                    }

                    for k in data:
                        for i, r in enumerate((0.5, 0, -10)):
                            if data[k]['coeff'] > r:
                                tiers[league][f'tier_{i+1}'].append(
                                    {'tier': f'tier_{i}', **data[k]}
                                )
                                break

    return (tiers)


if __name__ == '__main__':
    tiers = {}
    book = 'bet'
    if book == 'bet':
        tiers = get_tiers(book, get_bet_prices)
    if book == 'marathon':
        tiers = get_tiers(book, get_marathon_prices)

    pprint(tiers)
