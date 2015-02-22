from contextlib import contextmanager

import zmq
from zmq.eventloop import ioloop, zmqstream
import threading


port = "9999"


# Socket to talk to server
context = zmq.Context()
socket = context.socket(zmq.SUB)

print("Collecting updates from weather server...")
socket.connect("tcp://localhost:{}".format(port))

# Subscribe to zipcode, default is NYC, 10001
topicfilter = "".encode()
socket.setsockopt(zmq.SUBSCRIBE, topicfilter)

@contextmanager
def reac(f):
	try:
		stream_pull = zmqstream.ZMQStream(socket)
		stream_pull.on_recv(f)
		l = ioloop.IOLoop.instance()
		a = threading.Thread(None, l.start, None)
		a.start()
		yield None
	finally:
		l.stop()
		a.join()