"""App entry point."""
from edufera_backend.app import init_app

app, socketio = init_app()

if __name__ == "__main__":
    socketio.run(app)
