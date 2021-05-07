from flask import Flask
from flask_cors import CORS

app = Flask(__name__, instance_relative_config=False)
CORS(app, resources={r"/*": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object('config.Config')