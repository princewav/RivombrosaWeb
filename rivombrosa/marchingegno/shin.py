from math import sqrt


# "z" means proportion of n of insider trading
def inv(odd):
    return 1 / odd


def square(x):
    return x * x


def booksum(odds):
    return sum([1 / odd for odd in odds])


def get_z(odds):
    z = 0
    for i in range(500):
        z = sum([sqrt(square(z) + 4 * (1 - z) * (square(inv(odd)) / booksum(odds))) for odd in odds]) - 2
    return z


def get_real_odds(odds):
    odds = (odds['1'], odds['X'], odds['2'])
    total = []
    z = get_z(odds)
    for odd in odds:
        p = (
                (sqrt(square(z) + 4 * (1 - z) * (square(inv(odd)) / booksum(odds))) - z)
                / (2 - 2 * z)
        )
        total.append(inv(p))
    return {'1': total[0], 'X': total[1], '2': total[2]}
