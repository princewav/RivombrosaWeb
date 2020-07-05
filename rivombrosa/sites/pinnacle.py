from pprint import pprint

import requests

from rivombrosa.config import headers, teams_mapping
from rivombrosa.utilitites.converter import from_american_to_decimal
from rivombrosa.utilitites.utils import get_from_list_of_dicts, get_from_list_of_dicts_multiple

book = 'pinnacle'


def get_odds_by_id(straights, id):
    straight = ([x for x in get_from_list_of_dicts_multiple(straights, 'matchupId', id) if x.get('type') == 'moneyline' and x['period'] == 0] or [{}])[0]

    if straight:
        odds = {'1': from_american_to_decimal(get_from_list_of_dicts(straight['prices'], 'designation', 'home').get('price') or 0),
                'X': from_american_to_decimal(get_from_list_of_dicts(straight['prices'], 'designation', 'draw').get('price') or 0),
                '2': from_american_to_decimal(get_from_list_of_dicts(straight['prices'], 'designation', 'away').get('price') or 0)}
        if any([odds[k] == 0 for k in odds]):
            return None
        else:
            return odds


def get_prices(url):
    matchups_url = url
    straights_url = f'{url.rsplit("/", 1)[0]}/markets/straight'
    matchups = requests.get(matchups_url, headers=headers).json()
    straights = requests.get(straights_url, headers=headers).json()
    results = {}
    teams_map = teams_mapping[book]

    for matchup_info in matchups:
        if 'participants' in matchup_info:
            home_team = teams_map.get(matchup_info["participants"][0]["name"], '')
            away_team = teams_map.get(matchup_info["participants"][1]["name"], '')
            if not matchup_info['parent'] and all((home_team, away_team)):
                odds = get_odds_by_id(straights, matchup_info['id'])
                if odds:
                    results[f'{home_team} - {away_team}'] = odds

    return results


if __name__ == '__main__':
    url = 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2386/matchups'
    prices = get_prices(url)
    pprint(prices)
