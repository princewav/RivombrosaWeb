from bs4 import BeautifulSoup

from datetime import datetime

from rivombrosa.utilitites import utils
from rivombrosa.utilitites.utils import subdivide, selenium_driver

from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

book = 'bet'

def metodo_ad_hoc_bet_date(dates):
    total = []
    ref = ''
    for date in dates:
        if date:
            ref = date
            continue
        total.append(ref)
    return total


def get_source_html(driver, league):
    try:
        WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.CLASS_NAME, "cm-ParticipantWithBookCloses_Name")))
        page = driver.page_source
    except Exception as e:
        print(f'Fallito: {league}')
        return

    return page


def get_prices(driver, league):
    page = get_source_html(driver, league)
    if not page:
        return {}
    soup = BeautifulSoup(page, 'html.parser')

    matches = subdivide([x.text for x in soup.select('.cm-ParticipantWithBookCloses_Name')], 2)

    odds_groups = [x.text or 0 for x in soup.select('.cm-ParticipantOddsWithHandicap_Odds')]
    odds_groups = [x for x in zip(*subdivide(odds_groups, len(odds_groups)/3))]

    dates = [(x.findAll(text=True, recursive=False) or [''])[0]  for x in soup.select('.gl-Market_General > div')]
    dates = [f'{x.split(" ", 1)[-1]} {datetime.now().year}' for x in metodo_ad_hoc_bet_date(dates)]

    teams_map = utils.get_team_mapping()[book][league]
    matches = [[teams_map.get(team) for team in teams] for teams in matches]

    return {f'{team[0]} - {team[1]}': {'1': float(odds[0]), 'X': float(odds[1]), '2': float(odds[2]), 'date':date}
            for team, odds, date in zip(matches, odds_groups, dates) if 0 not in odds and team}

if __name__ == '__main__':
    driver = selenium_driver('https://mobile.bet365.it/#/AC/B1/C1/D13/E49852029/F2/')
    # driver = selenium_driver('https://mobile.bet365.it/#/AC/B1/C1/D13/E49487629/F2/')

    prices = get_prices(driver, 'serie a')
    print(prices)
