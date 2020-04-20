from . import game

from flask import render_template

@game.route('/')
def index():
    return render_template('game/index.html')