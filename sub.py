import time
import reac

def react(mess):
    mess = mess[0]
    mess = mess.decode()
    t = globals()["temp"]
    t.a = mess.split(" ")[1]

a, l = reac.get_background_io_loop(react)

a.start()

class lol():
    def __init__(self):
        self.a = None


try:
    temp = lol()
    while 1:
        print(temp.a)
        time.sleep(0.1)
except KeyboardInterrupt:
    l.stop()
    a.join()