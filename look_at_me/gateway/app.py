from collections import deque
import json
import time
from threading import Thread

import zmq
from zmq.eventloop import ioloop, zmqstream

from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit

ioloop.install()


## global config
port_receive = "5556"
port_emit = "9999"
thread = None
nb_elem_max = None
q = deque([], nb_elem_max)
fps = 5


####### Flask
app = Flask(__name__)
app.debug = False
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def index():
    print("lal")
    return render_template('index.html')

@socketio.on('connect', namespace='/test')
def test_connect():
    emit('my response', {'data': 'Connected', 'count': 0})
    emit("graph", {"data":"5"})

@socketio.on("control", namespace="/test")
def reverse_gateway(mess):
    """ Sends on ZMQ messages received from socketIO
    """
    print(mess)
    socket_emit.send_string(json.dumps(mess))
    print("sent control")


###### ZMQ
context = zmq.Context()

# socket for controlMe
socket_emit = context.socket(zmq.PUB)
s = "tcp://127.0.0.1:{}".format(port_emit)
socket_emit.bind(s)

# socket for lookAtMe
# receives data
data_receive = context.socket(zmq.SUB)
data_receive.connect("tcp://localhost:{}".format(port_receive))
topicfilter = "data".encode()
data_receive.setsockopt(zmq.SUBSCRIBE, topicfilter)

# receives plot config
config_receive = context.socket(zmq.SUB)
config_receive.connect("tcp://localhost:{}".format(port_receive))
topicfilter = "config".encode()
config_receive.setsockopt(zmq.SUBSCRIBE, topicfilter)


def flush_data():
    """Flush received data every n milliseconds
    """
    print("flushed", q)
    socketio.emit("graph", {"datas": list(q)}, namespace='/test')
    q.clear()

def now_milliseconds():
    """ Time in millisecond for javascript
    """
    return int(time.time() * 1000)

def recv_config(multipart):
    """Callback to configure the plot
    """
    print("config", multipart)

def recv_data(multipart):
    """Callback to send data to the plot
    """
    m = multipart[1]
    m = m.decode()
    index, temp = m.split(" ")
    q.append([now_milliseconds(), float(temp)])

flush_loop = ioloop.PeriodicCallback(flush_data, 1000.0/fps)

stream_data = zmqstream.ZMQStream(data_receive)
stream_data.on_recv(recv_data)

stream_config = zmqstream.ZMQStream(config_receive)
stream_config.on_recv(recv_config)


def main():
    try:
        l = ioloop.IOLoop.instance()
        a = Thread(None, l.start, None)
        a.start()
        flush_loop.start()
        socketio.run(app, host="0.0.0.0")
    except KeyboardInterrupt:
        socket_emit.close()
        l.stop()
        a.join()

if __name__ == '__main__':
    main()