from flask import Flask

from .game import game as game_bp


def create_app():
    app = Flask(__name__)
    
    app.register_blueprint(game_bp)

    return app