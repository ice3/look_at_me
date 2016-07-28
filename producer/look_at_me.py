import json
import zmq

c = zmq.Context()
s = c.socket(zmq.PUB)

protocol = "tcp"
port = "5556"
adress = "127.0.0.1"

s.bind("{}://{}:{}".format(protocol, adress, port))
print('Publisher bound to port {}'.format(port))


def send(name, datas):
    mess = {"name": name, "data": datas}
    print(mess)
    s.send_multipart(["data", json.dumps(mess)])

