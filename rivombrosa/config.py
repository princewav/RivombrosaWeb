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

EXCLUDED_LEAGUES = {
    '',
}

URLS_PER_LEAGUE = {
    'bet': {
        'Australia - A League': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E43171095/F2/',
        'Belgium - Cup': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50777846/F2/',
        'Belgium - First Division B': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50887025/F2/',
        'China - Super League': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50739249/F2/',
        'Croatia - Cup': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50777968/F2/',
        # 'Denmark - Superliga': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1913/matchups',
        'England - Championship': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E49659887/F2/',
        'England - FA Cup': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E49491269/F2/',
        'Finland - Veikkausliiga': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E49876445/F2/',
        # 'France - League Cup': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50778081/F2/',
        # 'Iceland - Premier League': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E49129217/F2/',
        'Italy - Serie A': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E49487629/F2/',
        'Japan - J League': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50078808/F2/',
        'Japan - J2 League': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50079352/F2/',
        'Korea Republic - K League 1': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E48633251/F2/',
        'Mexico - Primera Division': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50887028/F2/',
        # 'Morocco - Botola Pro': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E26537564/F2/',
        'Norway - 1st Division': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50076664/F2/',
        'Norway - Eliteserien': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E49049124/F2/',
        # 'Paraguay - Division Profesional': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50751942/F2/',
        'Portugal - Cup': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50778322/F2/',
        # 'Romania - Liga 1': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50052765/F2/',
        # 'Scotland - Premier League': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E49298083/F2/',
        'Sweden - Allsvenskan': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E49494264/F2/',
        'Sweden - Cup': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50051327/F2/',
        'Sweden - Superettan': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E49570991/F2/',
        'Switzerland - Super League': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E49677483/F2/',
        'Turkey - Cup': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E51066251/F2/',
        'UEFA - Champions League': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E43316955/F2/',
        'UEFA - Europa League': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E43330565/F2/',
        'USA - MLS is Back': 'https://mobile.bet365.it/#/AC/B1/C1/D13/E50424393/F2/'
    },
    'pinnacle': {
        'Australia - A League': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1766/matchups',
        'Belgium - Cup': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1819/matchups',
        'Belgium - First Division B': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1818/matchups',
        'China - Super League': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/6417/matchups',
        'Croatia - Cup': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1882/matchups',
        # 'Denmark - Superliga': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1913/matchups',
        'England - Championship': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1977/matchups',
        'England - FA Cup': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1979/matchups',
        'Finland - Veikkausliiga': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2024/matchups',
        # 'France - League Cup': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2034/matchups',
        # 'Iceland - Premier League': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2102/matchups',
        'Italy - Serie A': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2436/matchups',
        'Japan - J League': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2157/matchups',
        'Japan - J2 League': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2159/matchups',
        'Korea Republic - K League 1': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/207551/matchups',
        'Mexico - Primera Division': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2242/matchups',
        # 'Morocco - Botola Pro': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2253/matchups',
        'Norway - 1st Division': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2331/matchups',
        'Norway - Eliteserien': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2333/matchups',
        # 'Paraguay - Division Profesional': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2359/matchups',
        'Portugal - Cup': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2384/matchups',
        # 'Romania - Liga 1': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2395/matchups',
        # 'Scotland - Premier League': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2421/matchups',
        'Sweden - Allsvenskan': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1728/matchups',
        'Sweden - Cup': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2516/matchups',
        'Sweden - Superettan': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2476/matchups',
        'Switzerland - Super League': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2517/matchups',
        'Turkey - Cup': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2586/matchups',
        'UEFA - Champions League': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2627/matchups',
        'UEFA - Europa League': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2630/matchups',
        'USA - MLS is Back': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/209349/matchups'
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
