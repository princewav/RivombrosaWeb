import os
from pathlib import Path

from dotenv import load_dotenv

dotenv_path = Path(__file__).parent / '.flaskenv'
load_dotenv(dotenv_path)


def check_path(path):
    return str(path) if path.exists() else ''


class Config(object):
    SECRET_KEY = '917afe4ce2ef49f26478d47ef042e901'
    DATA_PATH = Path(__file__).parent.parent.parent / 'data'
    SECRET_KEY = 'jgfyf7fy7d5f65d6576t6y8fufftf7r565rkkih7'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite3'
    SQLALCHEMY_TRACK_MODIFICATIONS = False