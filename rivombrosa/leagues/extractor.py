import time
from pprint import pprint

import requests
from bs4 import BeautifulSoup

from rivombrosa import config
from rivombrosa.config import headers
from rivombrosa.sites.bet import get_source_html
from rivombrosa.utilitites.utils import get_soup, selenium_driver


def extract_bet_league_and_teams(driver, url):
    driver.get(url)
    time.sleep(3)
    page = get_source_html(driver, '')
    if page:
        soup = BeautifulSoup(page, 'html.parser')
    else:
        return set()
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


def get_league_and_team_names(book, url, driver):
    if book == 'bet':
        return extract_bet_league_and_teams(driver, url)
    if book == 'pinnacle':
        return extract_pinnacle_league_and_teams(url)


def extract(book, urls):
    total = {}
    driver = selenium_driver()
    for country, url in urls.items():
        print(book, country)
        total[country] = {x: x for x in get_league_and_team_names(book, url, driver)}
    driver.quit()
    return total

if __name__ == '__main__':
    print(extract('bet', config.URLS_PER_LEAGUE['bet']))
