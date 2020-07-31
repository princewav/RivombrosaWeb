import time
import pprint

import clipboard
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from rivombrosa.config import BUDGET, URLS_PER_LEAGUE
from rivombrosa.marchingegno.shin import get_real_odds, calcola_kelly, calcola_e
from rivombrosa.sites.pinnacle import get_prices as get_pinnacle_prices
from rivombrosa.sites.bet import get_prices as get_bet_prices
from rivombrosa.utilitites.utils import selenium_driver

leagues = list(URLS_PER_LEAGUE['bet'])

def get_tiers(book, prices_to_play_method):
    tiers = {x: {'tier_1': [], 'tier_2': [], 'tier_3': []} for x in URLS_PER_LEAGUE['pinnacle']}

    driver = selenium_driver()

    for league in leagues:
        print(league)
        pinnacle_data = get_pinnacle_prices(URLS_PER_LEAGUE['pinnacle'][league], league)
        driver.get(URLS_PER_LEAGUE['bet'][league])
        time.sleep(0.2)
        to_play_data = prices_to_play_method(driver, league)
        # print(to_play_data)

        for match, pinnacle_odds in pinnacle_data.items():
            if pinnacle_odds:
                to_play_odds = to_play_data.get(match)
                real_odds = get_real_odds(pinnacle_odds)

                if to_play_odds:
                    data = {
                        outcome: {
                            'match': match,
                            'league': league,
                            'outcome': outcome,
                            'date': to_play_odds['date'],
                            'odds': to_play_odds[outcome],
                            'pinnacle': pinnacle_odds[outcome],
                            'coeff': round((1 / real_odds[outcome] - 1 / to_play_odds[outcome]) * 100, 3),
                            'stake': int(round(calcola_kelly(BUDGET, to_play_odds[outcome], real_odds[outcome]))) * 2,
                            'esps': round(calcola_e(20, to_play_odds[outcome], real_odds[outcome]), 3),
                        } for outcome in ('1', 'X', '2')
                    }

                    for k in data:
                        for i, r in enumerate((1, 0.5, 0)):
                            if data[k]['coeff'] > r:
                                tiers[league][f'tier_{i+1}'].append(
                                    {'tier': f'tier_{i+1}', **data[k]}
                                )
                                break

    # driver.quit()
    clipboard.copy(pprint.pformat(tiers))
    return (tiers)


if __name__ == '__main__':
    tiers = {}
    book = 'bet'
    if book == 'bet':
        tiers = get_tiers(book, get_bet_prices)
    # if book == 'marathon':
    #     tiers = get_tiers(book, get_marathon_prices)

    pprint.pprint(tiers)
