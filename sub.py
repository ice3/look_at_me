import time
import reac

modifs = {"temp": None}

def plop(mess):
    mess = mess[0]
    mess = mess.decode()
    modifs["temp"] = mess.split(" ")[1]

a, l = reac.get_background_io_loop(plop)
a.start()

try:
    while 1:
        print(modifs["temp"])
        time.sleep(0.1)
except KeyboardInterrupt:
    l.stop()
    a.join()