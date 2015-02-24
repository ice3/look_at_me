import zmq

class LookAtMe():
    def __init__(self):
        self.port = "5556"
        self.context = zmq.Context()
        self.socket = self.context.socket(zmq.PUB)
        self.socket.bind("tcp://*:{}".format(self.port))

    def push(self, msg):
        """ sends a data on ZMQ
        """
        self.socket.send_string(msg)