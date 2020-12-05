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

def wait_element(driver, css_class):
    WebDriverWait(driver, 150).until(EC.presence_of_element_located((By.CLASS_NAME, css_class)))
    try:
        return driver.find_elements_by_class_name(css_class)[0]
    except Exception as e:
        print(e)
        return None


def get_source_html(driver, league):
    try:
        el = wait_element(driver, "gl-MarketGrid")
        susp = el.find_elements_by_class_name('cl-BettingSuspendedScreen_Message')
        if len(susp) > 0:
            print(f'Fallito: {league}')
            return

        page = driver.page_source
    except Exception as e:
        print(e)
        print(f'Fallito: {league}')
        return

    return page


def get_prices(driver, league):
    page = get_source_html(driver, league)
    if not page:
        return {}
    soup = BeautifulSoup(page, 'html.parser')

    matches = subdivide([x.text for x in soup.select('.rcl-ParticipantFixtureDetails_Team')], 2)

    odds_groups = [x.text or 0 for x in soup.select('.sgl-ParticipantOddsOnly80_Odds')]
    odds_groups = [x for x in zip(*subdivide(odds_groups, len(odds_groups)/3))]

    dates = [(x.findAll(text=True, recursive=False) or [''])[0]  for x in soup.select('.gl-Market_General > div')]
    dates = [f'{x.split(" ", 1)[-1]} {datetime.now().year}' for x in metodo_ad_hoc_bet_date(dates)]

    teams_map = utils.get_team_mapping()[book][league]
    matches = [[teams_map.get(team) for team in teams] for teams in matches]

    print(matches)
    print(odds_groups)
    print(dates)

    return {f'{team[0]} - {team[1]}': {'1': float(odds[0]), 'X': float(odds[1]), '2': float(odds[2]), 'date':date}
            for team, odds, date in zip(matches, odds_groups, dates) if 0 not in odds and team}

if __name__ == '__main__':
    driver = selenium_driver('https://www.bet365.it/#/AC/B1/C1/D13/E52224631/F2/')

    prices = get_prices(driver, 'Italy - Serie A')
    print(prices)
    driver.quit()
