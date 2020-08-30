from pprint import pprint

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait

from rivombrosa.utilitites.utils import selenium_driver

def estrai_link_bet():
    driver = selenium_driver()
    result = []
    try:
        driver.get('https://mobile.bet365.it/#/AS/B1/')
        WebDriverWait(driver, 40).until(EC.presence_of_element_located((By.CLASS_NAME, "gl-Market_CN-1")))

        links = driver.find_elements_by_class_name('gl-Market_CN-1')
        for i in range(len(links)):
            links = driver.find_elements_by_class_name('gl-Market_CN-1')
            links[i].click()
            WebDriverWait(driver, 40).until(EC.presence_of_element_located((By.CLASS_NAME, "cl-EnhancedDropDown")))
            league = driver.find_elements_by_class_name('cl-EnhancedDropDown')[0].text
            num_of_bets = len(driver.find_elements_by_class_name('cm-ParticipantWithBookCloses'))
            result.append((league, driver.current_url, num_of_bets))

            driver.get('https://mobile.bet365.it/#/AS/B1/')
            WebDriverWait(driver, 40).until(EC.presence_of_element_located((By.CLASS_NAME, "gl-Market_CN-1")))
    finally:
        driver.quit()

    pprint(sorted(result, key=lambda x: x[2]))


