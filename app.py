from threading import Thread
import time
import json

from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit

import zmq.green as zmq
# import zmq

app = Flask(__name__)
app.debug = False
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

port_receive = "5556"
port_emit = "9999"
thread = None

# Socket to talk to server
context = zmq.Context()

socket_emit = context.socket(zmq.PUB)
s = "tcp://127.0.0.1:{}".format(port_emit)
socket_emit.bind(s)


socket_receive = context.socket(zmq.SUB)
socket_receive.connect("tcp://localhost:{}".format(port_receive))
topicfilter = "".encode()
socket_receive.setsockopt(zmq.SUBSCRIBE, topicfilter)


def messages_gateway():
	while True:
		t = time.time()
		res = []
		while time.time() - t < 0.2:
			m = socket_receive.recv_string()
			m = m.decode()
			
			if m == 'quit':
				print 'exiting.'
				break

			index, temp = m.split(" ")
			res.append([time.time(), float(temp)])
		socketio.emit("graph", {"datas": res}, namespace='/test')

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

@socketio.on("control", namespace="/test")
def control_var(mess):
	print(mess)
	socket_emit.send_string(json.dumps(mess))
	print("sent control")

if __name__ == '__main__':
	try: 
	    socketio.run(app, host="0.0.0.0")
	except KeyboardInterrupt:
		socket_emit.close()