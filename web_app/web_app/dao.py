from pathlib import Path
import json
from web_app.web_app import app


def save_match(json_string, save_slot_name):
    with (app.config['DATA_PATH']/f'{save_slot_name}.json').open('w') as f:
        json.dump(json_string, f, ensure_ascii=False)


def load_match(save_slot_name):
    with Path('./data/{save_slot_name}.json').open() as f:
        json_string = json.load(f)
    return json_string
