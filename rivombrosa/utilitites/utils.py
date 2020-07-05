import requests
from bs4 import BeautifulSoup

from rivombrosa.config import headers


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


def lavagna(*odds):
    return
