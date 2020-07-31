import json
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from rivombrosa.config import headers, user_agent


def get_soup(url):
    response = requests.get(url, headers=headers)
    return BeautifulSoup(response.text, 'html.parser')


def get_from_list_of_dicts(list_of_dicts, key, value):
    return ([x for x in list_of_dicts if x.get(key) == value] or [{}])[0]

def get_from_list_of_dicts_multiple(list_of_dicts, key, value):
    return ([x for x in list_of_dicts if x.get(key) == value] or [{}])


def subdivide(l, n):
    total, sub = [], []
    for i, el in enumerate(l):
        sub.append(el)
        if i % n == n - 1:
            total.append(sub.copy())
            sub.clear()
    return total


def selenium_driver(url=''):
    options = Options()
    options.add_argument(user_agent)
    options.add_argument("--headless")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    driver = webdriver.Chrome(options=options)

    driver.set_window_position(0, 0)
    driver.set_window_size(375, 812)
    if url:
        driver.get(url)
    return driver

def get_team_mapping():
    p = Path(__file__).parent.parent / 'teams_map.json'
    with p.open() as f:
        return json.load(f)

def save_team_mapping(mapping):
    p = Path(__file__).parent.parent / 'teams_map.json'
    with p.open('w') as f:
        return json.dump(mapping, f)
