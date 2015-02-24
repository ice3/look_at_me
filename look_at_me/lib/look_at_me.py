import zmq

port = "5556"
context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://*:{}".format(port))


def push(msg):
    """ sends a data on ZMQ
    """
    socket.send_string(msg)