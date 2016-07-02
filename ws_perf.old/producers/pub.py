import time
import math
import json
import zmq

c = zmq.Context()
s = c.socket(zmq.PUB)
s.bind("tcp://127.0.0.1:5556")
print('Publisher bound to port 5556')

fps = 100.0
i = 0.0
while 1:
    mess = {"t": time.time()*1000, "y": math.cos(i/100)}
    print(mess)
    s.send_multipart(["data ", json.dumps(mess)])
    time.sleep(1.0/fps)
    i+=1