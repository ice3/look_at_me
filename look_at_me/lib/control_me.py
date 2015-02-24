from contextlib import contextmanager

import zmq
from zmq.eventloop import ioloop, zmqstream
import threading


class ControlMe():
    port = "9999"
    context = zmq.Context()
    socket = context.socket(zmq.SUB)
    socket.connect("tcp://localhost:{}".format(port))
    topicfilter = "".encode()
    socket.setsockopt(zmq.SUBSCRIBE, topicfilter) 

    @classmethod
    @contextmanager
    def reac_with(cls, f):
        """ Runtime loop calling the f function each time 
        a ZMQ message is received. 
        """
        try:
            stream_pull = zmqstream.ZMQStream(cls.socket)
            stream_pull.on_recv(f)
            l = ioloop.IOLoop.instance()
            a = threading.Thread(None, l.start, None)
            a.start()
            yield None
        finally:
            # we kill the thread when we finish
            l.stop()
            a.join()