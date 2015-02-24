import time
import math
from look_at_me import ControlMe, LookAtMe

def update_freq(mess):
    mess = mess[0]
    mess = mess.decode()
    mess = eval(mess)
    print(mess)
    globals()["freq"] = float(mess["data"])


freq = 10
i = 0.0

lam = LookAtMe()
with ControlMe.reac_with(update_freq):
    while True:
        data = math.sin(float(freq)/5 * i)
        msg = "{} {}".format(i, data)
        lam.push(msg)
        
        mess_per_sec = 100.0
        time.sleep(1.0/mess_per_sec)
        i += 0.01
