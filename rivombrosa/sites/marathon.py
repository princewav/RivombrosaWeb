from rivombrosa.config import teams_mapping
from rivombrosa.utilitites.utils import subdivide, get_soup

book = 'marathon'


def get_prices(url):
    soup = get_soup(url)

    teams = subdivide([x.text for x in soup.select('tbody .member-link span')], 2)
    odds_groups = subdivide([x.text for x in soup.select('.price span')], 3)

    teams_map = teams_mapping[book]

    return {f'{teams_map[team[0]]} - {teams_map[team[1]]}': {'1': float(odds[0]), 'X': float(odds[1]), '2': float(odds[2])}
            for team, odds in zip(teams, odds_groups) if team[0] in teams_map}


if __name__ == '__main__':
    url = 'https://www.marathonbet.it/it/popular/Football/Portugal/Primeira+Liga+-+43058'
    prices = get_prices(url)
    print(prices)
