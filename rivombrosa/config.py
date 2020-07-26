headers = {
    'authority': 'guest.api.arcadia.pinnacle.com',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'accept': 'application/json',
    'x-device-uuid': 'e5f83264-4afb5bcf-47bea0d1-93b5b53f',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'x-api-key': 'CmX2KcMrXuFmNg6YFbmTxE0y9CIrOi0R',
    'content-type': 'application/json',
    'origin': 'https://www.pinnacle.bet',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://www.pinnacle.bet/it/soccer/italy-serie-a/matchups/',
    'accept-language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7,nl;q=0.6',
}
user_agent = '--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'

# urls_per_league = {
#     'Premier League': {'pinnacle': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1980/matchups',
#                        'marathon': 'https://www.marathonbet.it/it/betting/Football/England/Premier+League+-+21520', },
#     'Primera Division': {'pinnacle': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2196/matchups',
#                          'marathon': 'https://www.marathonbet.it/it/betting/Football/Spain/Primera+Division+-+8736', },
#     # "Prem'er-Liga": {'pinnacle': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2406/matchups',
#     #            'marathon': 'https://www.marathonbet.it/it/betting/Football/Russia/Premier+League+-+22433',}
#     'Serie A': {'pinnacle': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2436/matchups',
#                 'marathon': 'https://www.marathonbet.it/it/popular/Football/Italy/Serie+A+-+22434', }
#     # 'Primeira Liga': {'pinnacle': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2386/matchups',
#     #                   'marathon': 'https://www.marathonbet.it/it/popular/Football/Portugal+-+21518',},
# }

URLS_PER_LEAGUE = {'bet': {#'cina': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50739249/F2/',
                           # 'corea 2 league': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E48688447/F2/',
                           # 'giappone': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50078808/F2/',
                           'giappone 2 league': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50079352/F2/',
                           },
                   'pinnacle': {# 'cina': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/6417/matchups',
                                # 'corea 2 league': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/207552/matchups',
                                # 'giappone': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2157/matchups',
                                 'giappone 2 league': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2159/matchups',
                                }
                   }

flags = {
    'Serie A': '🇮🇹',
    'Premier League': '🇬🇧',
    'Primera Division': '🇪🇸',
    "Primeira Liga": '🇵🇹',
    "Prem'er-Liga": '🇷🇺',
}

EXPECTED_EARNING = 10
BUDGET = 323
