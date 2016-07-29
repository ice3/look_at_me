import time
import math

import look_at_me


fps = 10.0
i = 0.0
while 1:
    x= int(math.cos(i/100)*1000)/100.0
    y= int(math.sin(i/100)*1000)/100.0
    look_at_me.send("cos", [x])
    look_at_me.send("sin", [y])
    time.sleep(1.0/fps)
    i+=1