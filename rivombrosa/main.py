from pprint import pprint

from rivombrosa.marchingegno.comparator import get_tiers

tiers = get_tiers()
for league, data in tiers.items():
    if any(data.get(f'tier_{i}') for i in range(1,4)):
        print(league)
        pprint(data)
        print()
