import zmq
import random
import sys
import time
import math

port = "5556"
if len(sys.argv) > 1:
    port =  sys.argv[1]
    int(port)

context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://*:{}".format(port))

i = 0.0
while True:
    messagedata = math.sin(i/100)
    print("{} {}".format(i, messagedata))
    socket.send_string("{} {}".format(i, messagedata))
    mess_per_sec = 200.0
    time.sleep(1.0/mess_per_sec)
    i += 1

