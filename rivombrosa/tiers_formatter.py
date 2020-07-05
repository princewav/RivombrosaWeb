import datetime

import clipboard as clipboard

from rivombrosa.marchingegno.comparator import get_tiers

flags = {
    'italia': '🇮🇹',
    'inghilterra': '🇬🇧',
    'spagna': '🇪🇸',
    'portogallo': '🇵🇹',
    'russia': '🇷🇺',
}

all_tiers = get_tiers()
result = f'*{datetime.datetime.now().strftime("%A, %d %B %Y, %H:%M")}*\n\n'
for country, tiers in all_tiers.items():
    if any([len(tiers['tier_1']), len(tiers['tier_2']), len(tiers['tier_3'])]):
        result += f'{flags[country]} _{country.capitalize()}_\n'

        for t in ('tier_1', 'tier_2', 'tier_3'):
            result += f'*{t.replace("_", " ").title()}:*\n'
            if len(tiers[t]):
                for info in tiers[t]:
                    result += f'{info["match"]} *{info["outcome"]}* / {info["marathon"]} *({info["coeff"]}%)* > € {info["stake"] or 1}\n'
            else:
                result += f'_Nessun match nel {t.replace("_", " ").title()}_\n'
        result += '\n'

print(result)
clipboard.copy(result)
