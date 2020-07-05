def from_american_to_decimal(odd):
    if odd > 0:
        return round(odd / 100 + 1, 3)
    elif odd < 0:
        return round(100 / abs(odd) + 1, 3)
    else:
        return 0
