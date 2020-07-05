import sys
from flask import Flask
from web_app.web_app.config import Config

app = Flask(__name__)
app.config.from_object(Config)

sys.path.append("..")
from web_app.web_app import routes
