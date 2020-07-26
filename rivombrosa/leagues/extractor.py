from pprint import pprint

import requests
from bs4 import BeautifulSoup

from rivombrosa.config import headers
from rivombrosa.sites.bet import get_source_html
from rivombrosa.utilitites.utils import get_soup


def extract_bet_league_and_teams(url):
    page = get_source_html(url)
    soup = BeautifulSoup(page, 'html.parser')
    teams = set([x.text for x in soup.select('.cm-ParticipantWithBookCloses_Name')])
    return teams

def extract_pinnacle_league_and_teams(url):
    matchups = requests.get(url, headers=headers).json()
    teams = set()
    for matchup_info in matchups:
        if 'participants' in matchup_info:
            if not matchup_info['parent']:
                if len(matchup_info['participants']) == 2:
                    teams.add(matchup_info["participants"][0]["name"])
                    teams.add(matchup_info["participants"][1]["name"])
    return teams


def get_league_and_team_names(book, url):
    if book == 'bet':
        return extract_bet_league_and_teams(url)
    if book == 'pinnacle':
        return extract_pinnacle_league_and_teams(url)


def extract(book, urls):
    total = {}
    for country, url in urls.items():
        total.update({x: x for x in get_league_and_team_names(book, url)})
    return total
