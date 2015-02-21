from threading import Thread
import time

from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit

import zmq.green as zmq

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

port = "5556"
thread = None

# Socket to talk to server
context = zmq.Context()
socket = context.socket(zmq.SUB)
socket.connect("tcp://localhost:{}".format(port))
topicfilter = "".encode()
socket.setsockopt(zmq.SUBSCRIBE, topicfilter)

def messages_gateway():
	while True:
		t = time.time()
		res = []
		while time.time() - t < 0.15:
			m = socket.recv_string()
			m = m.decode()
			zip_code, temp = m.split(" ")
			print(temp)
			res.append([time.time(), float(temp)])
		print(res)
		socketio.emit("graph", {"datas": res}, namespace='/test')
		if m == 'quit':
			print 'exiting.'
			break


@app.route("/")
def index():
	global thread
	if not thread:
		thread = Thread(target=messages_gateway)
		thread.start()
	return render_template('index.html')

@socketio.on('connect', namespace='/test')
def test_connect():
	emit('my response', {'data': 'Connected', 'count': 0})
	emit("graph", {"data":"5"})

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0")
