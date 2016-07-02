import zmq

c = zmq.Context()
s = c.socket(zmq.SUB)
s.connect("tcp://127.0.0.1:5556")
s.setsockopt(zmq.SUBSCRIBE, '')
print('Subscriver connected to port 5556')

while 1:
	mess = s.recv_multipart()
	print(mess)