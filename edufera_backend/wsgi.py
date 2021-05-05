"""App entry point."""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
from flask_cors import CORS


db = SQLAlchemy()
app = Flask(__name__, instance_relative_config=False)
socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app)
app.config.from_object('config.Config')


@socketio.on('aaa')
def test_connect():
    print("Welcome, aaa received")
    emit('aaa_response', {'data': 'Server'})

if __name__ == "__main__":
    db.init_app(app)
    with app.app_context():
        from app import routes
        db.create_all()  # Create sql tables for our data ml_models
        socketio.run(app, port=5000, debug=True)

