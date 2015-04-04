from threading import Thread
import time
import json

# from gevent import monkey
import gevent
# monkey.patch_all()

from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit

import zmq
from zmq.eventloop import ioloop, zmqstream
# from zmq.green import zmq

ioloop.install()

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


data_receive = context.socket(zmq.SUB)
data_receive.connect("tcp://localhost:{}".format(port_receive))
topicfilter = "data".encode()
data_receive.setsockopt(zmq.SUBSCRIBE, topicfilter)

config_receive = context.socket(zmq.SUB)
config_receive.connect("tcp://localhost:{}".format(port_receive))
topicfilter = "config".encode()
config_receive.setsockopt(zmq.SUBSCRIBE, topicfilter)

from collections import deque

nb_elem_max = None
q = deque([], nb_elem_max)

def flush_data():
    """Flush received data every n milliseconds
    """
    print("flushed", q)
    socketio.emit("graph", {"datas": list(q)}, namespace='/test')
    q.clear()

def now_milliseconds():
   return int(time.time() * 1000)

def recv_config(multipart):
    print("config", multipart)

def recv_data(multipart):
    m = multipart[1]
    m = m.decode()
    index, temp = m.split(" ")
    q.append([now_milliseconds(), float(temp)])

stream_data = zmqstream.ZMQStream(data_receive)
stream_config = zmqstream.ZMQStream(config_receive)

fps = 5
flush_loop = ioloop.PeriodicCallback(flush_data, 1000.0/fps)
stream_data.on_recv(recv_data)
stream_config.on_recv(recv_config)


# def zmq_data_to_socketio():
#     """ Gateway between ZMQ and socketIO.
#     Messages from ZMQ are buffered for some time then
#     the list is sent by socketIO. This is necessary for performance
#     issues.

#     Messages are sent as json and time since Epoch in milliseconds is added.
#     This is necessary to be parsed in javascript...
#     """
#     while True:
#         t = time.time()
#         res = []
#         while time.time() - t < 0.05    :
#             m = data_receive.recv_multipart()[1]
#             m = m.decode()
#             print(m)
#             if m == 'quit':
#                 print 'exiting.'
#                 break

#             index, temp = m.split(" ")
#             res.append([now_milliseconds(), float(temp)])
#         if res:
#             socketio.emit("graph", {"datas": res}, namespace='/test')

# thread = Thread(target=zmq_data_to_socketio)
# thread.start()

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