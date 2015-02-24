# Look At Me - Control Me

## Description 
 * Look At Me: a simple way to plot the value of your variable, in real time, in your browser. Just add one line in your code and you're good to go. Very pretentious. 
 * Control Me: a simple way to modify some parameters in your code, in real time, from your browser, and you can see the effect in your _look at me_ graph. 


## Flash tutorial
In the root directory 

	PYTHONPATH+=. python exemples/basic.py
	python src/gateway/app.py

Now go to ``http://localhost:5000/``

## A day in a programmer's life
One day, I had to change a piece code that produced some data and I wanted to see what it was doing? So I designed a ugly hack to plot the data. Redirect everything in a file, used Matplolib / gnuplot to plot them and it was OK. Don't judge me, you've done that too, or not -- but in this case you still don't know what is happening and you're not better than me --. 

Then I had an other project, other data, same problem. Data format was different, copy paste the hack, tweak it and Bob's your uncle, I have the trend. 

Then, something awful happened, I had to look at the data *while* they were produced. No problem, Matplotlib has an animation library, you update the data, everything is good. Too bad it had to work on MacOs where Matplotlib's animation framework is broken... 
 
Now imagine I have to set a threshold on these data. What can I do? I can plot them, modify my program, kill it, compile / launch it and I can see my value is wrong. Great! Took me 20 seconds to change a number and now I'm checking my mails... All this to modify the threshold again. 

So I decided to create _look at me / control me_ a simple logging / visualization tool for variables where you can also easilly control / change them. 




## Comparison with other tools
 * Print: great, but where is the plot ? 
 * Print and gnuplot: what if I tell you that some people what to see things we they happen and not (a long time) after they happened? 
 * Matplotlib (python): same as gnuplot. 
 * Awesome custom Qt5 application: you must be kidding.

 More seriously, they are great tools for some applications. Nevertheless, you have make some custom ad hoc code each time and it's a pity.


## Installation - requirements


## How it works
 * Send data to a gateway
 * GW sends data to visualisation tool

## Limitations
 * Perf issues on real time
 * Graph types
