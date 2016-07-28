import time
import math

import look_at_me


fps = 10.0
i = 0.0
while 1:
    x= int(math.cos(i/100)*1000)/100.0
    look_at_me.send("cos", [x])
    time.sleep(1.0/fps)
    i+=1