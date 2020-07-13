from rivombrosa.config import teams_mapping
from rivombrosa.utilitites.utils import subdivide, get_soup
from datetime import datetime
book = 'marathon'

months_literals = {
    1: 'Gen',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'Mag',
    6: 'Giu',
    7: 'Lug',
    8: 'Ago',
    9: 'Set',
    10: 'Ott',
    11: 'Nov',
    12: 'Dec',
}


def add_date(date):
    if ' ' in date:
        return date
    else:
        return f'{datetime.now().day} {months_literals[datetime.now().month]} {date}'


def get_prices(url):
    soup = get_soup(url)

    teams = subdivide(
        [x.text for x in soup.select('tbody .member-link span')], 2)
    odds_groups = subdivide([x.text for x in soup.select('.price span')], 3)

    dates = [x.text.strip() for x in soup.select('td.date')]
    dates = [add_date(x) for x in dates]

    teams_map = teams_mapping[book]

    return {f'{teams_map[team[0]]} - {teams_map[team[1]]}': {'1': float(odds[0]), 'X': float(odds[1]), '2': float(odds[2]), 'date':date}
            for team, odds, date in zip(teams, odds_groups, dates) if team[0] in teams_map}


if __name__ == '__main__':
    url = 'https://www.marathonbet.it/it/popular/Football/Portugal/Primeira+Liga+-+43058'
    prices = get_prices(url)
    print(prices)
