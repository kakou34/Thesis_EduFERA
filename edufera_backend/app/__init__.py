from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO

db = SQLAlchemy()


def init_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')

    db.init_app(app)
    with app.app_context():
        from . import routes  # Import routes
        db.create_all()  # Create sql tables for our data ml_models
        socketio = SocketIO(app, cors_allowed_origins='*')
        return app, socketio
