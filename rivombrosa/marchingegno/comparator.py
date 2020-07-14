from pprint import pprint

from rivombrosa.config import urls_per_league, leagues, BUDGET
from rivombrosa.marchingegno.shin import get_real_odds, calcola_kelly, calcola_e
from rivombrosa.sites.marathon import get_prices as get_marathon_prices
from rivombrosa.sites.pinnacle import get_prices as get_pinnacle_prices


def get_tiers():
    tiers = {x: {'tier_1': [], 'tier_2': [], 'tier_3': []} for x in leagues}
    for league, urls in urls_per_league.items():
        pinnacle_data = get_pinnacle_prices(urls['pinnacle'])
        marathon_data = get_marathon_prices(urls['marathon'])

        for match, pinnacle_odds in pinnacle_data.items():
            if pinnacle_odds:
                marathon_odds = marathon_data.get(match)
                real_odds = get_real_odds(pinnacle_odds)

                if marathon_odds:
                    data = {
                        outcome: {
                            'match': match,
                            'league': league,
                            'outcome': outcome,
                            'date': marathon_odds['date'],
                            'marathon': marathon_odds[outcome],
                            'pinnacle': pinnacle_odds[outcome],
                            'coeff': round((1 / real_odds[outcome] - 1 / marathon_odds[outcome]) * 100, 3),
                            'stake': int(round(calcola_kelly(BUDGET, marathon_odds[outcome], real_odds[outcome]))) * 2,
                            'esps': round(calcola_e(20, marathon_odds[outcome], real_odds[outcome]), 3),
                        } for outcome in ('1', 'X', '2')
                    }

                    for k in data:
                        for i, r in enumerate((1.25, 1, 0.75)):
                            if data[k]['coeff'] > r:
                                tiers[league][f'tier_{i+1}'].append(
                                    {'tier': f'tier_{i}', **data[k]}
                                )
                                break

    return (tiers)


if __name__ == '__main__':
    tiers = get_tiers()
    pprint(tiers)
