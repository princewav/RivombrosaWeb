from pprint import pprint

from fuzzywuzzy import process

from rivombrosa import config
from rivombrosa.leagues.extractor import extract
from rivombrosa.utilitites import utils


def match_team_names(teams_per_book):
    teams_1 = teams_per_book['bet']
    teams_2 = teams_per_book['pinnacle']

    for team in teams_2:
        result, points = process.extract(team, list(teams_1), limit=1)[0]
        if points > 50:
            teams_2[team] = min(result, team, key=len)


# result_teams = {}
# add_teams_to_dict(pinna, bet, 'pinnacle')
# add_teams_to_dict(bet, pinna, 'bet')
# pprint(result_teams)


if __name__ == '__main__':
    books = ['bet', 'pinnacle']
    teams_per_book = {'bet': {}, 'pinnacle': {}}
    for book in books:
        teams_per_book[book] = extract(book, config.URLS_PER_LEAGUE[book])

    match_team_names(teams_per_book)
    teams_map = utils.get_team_mapping()
    teams_map['bet'].update(teams_per_book['bet'])
    teams_map['pinnacle'].update(teams_per_book['pinnacle'])

    utils.save_team_mapping(teams_map)
    print('Mappa delle squadre salvata')
