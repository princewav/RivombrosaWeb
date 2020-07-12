from pprint import pprint

from rivombrosa.config import urls_per_country, countries, BUDGET
from rivombrosa.marchingegno.shin import get_real_odds, calcola_kelly
from rivombrosa.sites.marathon import get_prices as get_marathon_prices
from rivombrosa.sites.pinnacle import get_prices as get_pinnacle_prices


def calcola_coeff_for_outcome(outcome, real_odds, marathon_odds):
    return 1 / real_odds[outcome] - 1 / marathon_odds[outcome]


def calcola_kelly_for_outcome(outcome, real_odds, marathon_odds):
    return int(round(calcola_kelly(BUDGET, marathon_odds[outcome], real_odds[outcome]))) * 2


def get_tiers():
    tiers = {x: {'tier_1': [], 'tier_2': [], 'tier_3': []} for x in countries}
    for country, urls in urls_per_country.items():
        pinnacle_data = get_pinnacle_prices(urls['pinnacle'])
        marathon_data = get_marathon_prices(urls['marathon'])

        for match, pinnacle_odds in pinnacle_data.items():
            if pinnacle_odds:
                marathon_odds = marathon_data.get(match)
                real_odds = get_real_odds(pinnacle_odds)

                if marathon_odds:
                    value_coeffs = {
                        '1': {
                            'coeff': calcola_coeff_for_outcome('1', real_odds, marathon_odds),
                            'marathon': marathon_odds['1'],
                            'stake': calcola_kelly_for_outcome('1', real_odds, marathon_odds),
                        },
                        'X': {
                            'coeff': calcola_coeff_for_outcome('X', real_odds, marathon_odds),
                            'marathon': marathon_odds['X'],
                            'stake': calcola_kelly_for_outcome('X', real_odds, marathon_odds),
                        },
                        '2': {
                            'coeff': calcola_coeff_for_outcome('2', real_odds, marathon_odds),
                            'marathon': marathon_odds['2'],
                            'stake': calcola_kelly_for_outcome('2', real_odds, marathon_odds),
                        },
                    }
                    for k in value_coeffs:
                        value_coeffs[k]['coeff'] = round((value_coeffs[k]['coeff'] * 100), 3)

                    for k in value_coeffs:
                        if value_coeffs[k]['coeff'] > 1.25:
                            tiers[country]['tier_1'].append({'match': f'{match}', 'outcome': k, **value_coeffs[k]})
                        elif value_coeffs[k]['coeff'] > 1:
                            tiers[country]['tier_2'].append({'match': f'{match}', 'outcome': k, **value_coeffs[k]})
                        elif value_coeffs[k]['coeff'] > 0.75:
                            tiers[country]['tier_3'].append({'match': f'{match}', 'outcome': k, **value_coeffs[k]})

    return (tiers)


if __name__ == '__main__':
    tiers = get_tiers()
    pprint(tiers)
