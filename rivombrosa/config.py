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

urls_per_league = {
    'Premier League': {'pinnacle': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/1980/matchups',
                       'marathon': 'https://www.marathonbet.it/it/betting/Football/England/Premier+League+-+21520'},
    'Primera Division': {'pinnacle': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2196/matchups',
                         'marathon': 'https://www.marathonbet.it/it/betting/Football/Spain/Primera+Division+-+8736'},
    # 'Prem'er-Liga': {'pinnacle': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2406/matchups',
    #            'marathon': 'https://www.marathonbet.it/it/betting/Football/Russia/Premier+League+-+22433'},
    'Serie A': {'pinnacle': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2436/matchups',
                'marathon': 'https://www.marathonbet.it/it/popular/Football/Italy/Serie+A+-+22434'},
    'Primeira Liga': {'pinnacle': 'https://guest.api.arcadia.pinnacle.com/0.1/leagues/2386/matchups',
                      'marathon': 'https://www.marathonbet.it/it/popular/Football/Portugal+-+21518'},
}

leagues = {
    'Premier League',
    'Primera Division',
    "Prem'er-Liga",
    'Serie A',
    'Primeira Liga',
}
flags = {
    'Serie A': '🇮🇹',
    'Premier League': '🇬🇧',
    'Primera Division': '🇪🇸',
    "Primeira Liga": '🇵🇹',
    "Prem'er-Liga": '🇷🇺',
}

teams_mapping = {
    'pinnacle': {
        # ita
        'Torino': 'Torino', 'Lazio': 'Lazio', 'Genoa': 'Genoa', 'Juventus': 'Juventus', 'Bologna': 'Bologna', 'Cagliari': 'Cagliari', 'FC Internazionale': 'Inter',
        'Brescia': 'Brescia', 'Fiorentina': 'Fiorentina', 'Sassuolo': 'Sassuolo', 'Lecce': 'Lecce', 'Sampdoria': 'Sampdoria', 'SPAL': 'SPAL', 'AC Milan': 'Milan',
        'Hellas Verona FC': 'Verona', 'Parma FC': 'Parma', 'Atalanta BC': 'Atalanta', 'Napoli': 'Napoli', 'AS Roma': 'Roma', 'Udinese': 'Udinese',
        # ing
        'West Ham United': 'West Ham', 'Watford': 'Watford', 'Burnley': 'Burnley', 'Sheffield United': 'Sheffield', 'Bournemouth': 'Bournemouth',
        'Tottenham Hotspur': 'Tottenham', 'Leicester City': 'Leicester', 'Arsenal': 'Arsenal', 'Newcastle United': 'Newcastle',
        'Manchester City': 'Man City', 'Southampton': 'Southampton', 'Chelsea': 'Chelsea', 'Brighton & Hove Albion': 'Brighton',
        'Norwich City': 'Norwich', 'Wolves': 'Wolves', 'Liverpool': 'Liverpool', 'Everton': 'Everton',
        'Aston Villa': 'Aston Villa', 'Manchester United': 'Man United', 'Crystal Palace': 'Crystal Palace',
        # spa
        'Atletico Madrid': 'Atletico Madrid', 'Leganes': 'Leganes', 'Villarreal CF': 'Villarreal', 'Espanyol': 'Espanyol', 'Levante UD': 'Levante',
        'Real Madrid': 'Real Madrid', 'Osasuna': 'Osasuna', 'Athletic Club Bilbao': 'Athletic Bilbao', 'Real Valladolid CF': 'Valladolid',
        'Real Betis': 'Betis', 'Mallorca': 'Mallorca', 'Eibar': 'Eibar', 'Barcelona': 'Barcelona', 'Alaves': 'Alaves', 'Getafe': 'Getafe', 'Granada CF': 'Granada',
        'Celta Vigo': 'Celta Vigo', 'Valencia': 'Valencia', 'Real Sociedad': 'Real Sociedad', 'Sevilla': 'Sevilla',
        # rus
        # por
        'Gil Vicente': 'Gil Vicente', 'Vitoria Setubal': 'Vitoria Setubal', 'Pacos de Ferreira': 'Pacos de Ferreira', 'Sporting Lisbon': 'Sporting Lisbon',
        'Belenenses': 'Belenenses', 'Boavista Porto': 'Boavista', 'FC Porto': 'Porto', 'Moreirense FC': 'Moreirense', 'Famalicao': 'Famalicao',
        'Rio Ave FC': 'Rio Ave', 'Santa Clara': 'Santa Clara', 'CS Maritimo': 'Maritimo', 'Portimonense': 'Portimonense', 'Guimaraes': 'Guimaraes', 'Benfica': 'Benfica',
        'Tondela': 'Tondela', 'Aves': 'Aves', 'Braga': 'Braga'

    },
    'marathon': {
        # ita
        'Torino': 'Torino', 'Lazio': 'Lazio', 'Genoa': 'Genoa', 'Juventus': 'Juventus', 'Bologna': 'Bologna', 'Cagliari': 'Cagliari', 'Inter': 'Inter',
        'Brescia': 'Brescia', 'Fiorentina': 'Fiorentina', 'Sassuolo': 'Sassuolo', 'Lecce': 'Lecce', 'Sampdoria': 'Sampdoria', 'SPAL': 'SPAL', 'Milan': 'Milan',
        'Verona': 'Verona', 'Parma': 'Parma', 'Atalanta': 'Atalanta', 'Napoli': 'Napoli', 'Roma': 'Roma', 'Udinese': 'Udinese',
        # ing
        'West Ham United': 'West Ham', 'Watford': 'Watford', 'Burnley': 'Burnley', 'Sheffield United': 'Sheffield', 'Bournemouth': 'Bournemouth',
        'Tottenham Hotspur': 'Tottenham', 'Leicester City': 'Leicester', 'Arsenal': 'Arsenal', 'Newcastle United': 'Newcastle',
        'Manchester City': 'Man City', 'Southampton': 'Southampton', 'Chelsea': 'Chelsea', 'Brighton & Hove Albion': 'Brighton',
        'Norwich City': 'Norwich', 'Wolverhampton Wanderers': 'Wolves', 'Liverpool': 'Liverpool', 'Everton': 'Everton',
        'Aston Villa': 'Aston Villa', 'Manchester United': 'Man United', 'Crystal Palace': 'Crystal Palace',
        # spa
        'Betis': 'Betis', 'Maiorca': 'Mallorca', 'Barcellona': 'Barcelona', 'Valencia': 'Valencia', 'Villarreal': 'Villarreal', 'Osasuna': 'Osasuna',
        'Real Sociedad': 'Real Sociedad', 'Eibar': 'Eibar', 'Alaves': 'Alaves', 'Levante': 'Levante', 'Athletic Bilbao': 'Athletic Bilbao', 'Valladolid': 'Valladolid',
        'Real Madrid': 'Real Madrid', 'Atletico Madrid': 'Atletico Madrid', 'Getafe': 'Getafe', 'Leganes': 'Leganes', 'Granada': 'Granada', 'Siviglia': 'Sevilla',
        'Celta Vigo': 'Celta Vigo', 'Espanyol': 'Espanyol',
        # rus
        'Arsenal Tula': 'Arsenal Tula', 'Ufa': 'Ufa', 'Tambov': 'Tambov', 'FC Sochi': 'Sochi',
        'Krasnodar': 'Krasnodar', 'Akhmat Grozny': 'Akhmat Grozny', 'Rubin Kazan': 'Rubin Kazan', 'Rostov': 'Rostov', 'Dinamo Mosca': 'Dinamo Mosca',
        'Zenit San Pietroburgo': 'Zenit San Pietroburgo',
        # por
        'Belenenses': 'Belenenses', 'Moreirense': 'Moreirense', 'Pacos de Ferreira': 'Pacos de Ferreira', 'Maritimo': 'Maritimo', 'Boavista': 'Boavista', 'Rio Ave': 'Rio Ave',
        'Vitoria Setubal': 'Vitoria Setubal', 'Sporting Braga': 'Sporting Braga', 'Aves': 'Aves', 'Porto': 'Porto', 'Tondela': 'Tondela', 'Vitoria Guimaraes': 'Vitoria Guimaraes',
        'Portimonense': 'Portimonense', 'Sporting Lisbona': 'Sporting Lisbona', 'Santa Clara': 'Santa Clara', 'Benfica': 'Benfica', 'Famalicao': 'Famalicao',
        'Gil Vicente': 'Gil Vicente'
    },
}

EXPECTED_EARNING = 10
BUDGET = 323
