import time
from threading import Thread

from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def index():
	return render_template('index.html')

@socketio.on('connect', namespace='/test')
def test_connect():
	print('olo')
	emit('my response', {'data': 'Connected', 'count': 0})

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0")