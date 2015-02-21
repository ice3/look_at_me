import zmq
import sys
import time
import math
import reac

port = "5556"
context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://*:{}".format(port))



freq = 10
def react(mess):
    mess = mess[0]
    mess = mess.decode()
    mess = eval(mess)
    print(mess)
    globals()["freq"] = float(mess["data"])

a, l = reac.get_background_io_loop(react)
a.start()

i = 0.0

try:
    while True:
        messagedata = math.sin(float(freq)/5 * i/100)
        # print("{} {} {}".format(i, messagedata, freq))
        socket.send_string("{} {}".format(i, messagedata))
        mess_per_sec = 200.0
        time.sleep(1.0/mess_per_sec)
        i += 1
except KeyboardInterrupt:
    l.stop()
    a.join()
