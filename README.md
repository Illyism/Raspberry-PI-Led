# Raspberry-PI-Led

For the NMCT Data Communication project. Using WS2801.

1. [Getting Started](#getting-started)
    1. [Setting up the Raspberry PI](#setting-up-the-raspberry-pi)
    2. [GPIO Interface](#gpio-interface)
    3. [Raspberry PI GPIO](#raspberry-pi-gpio)
2. [LEDs](#leds)
    1. [Blinking a LED](#blinking-a-led)
5. [Webserver](#webserver)
    1. [Nginx](#nginx)

## Getting Started
### Setting up the Raspberry PI

The first step is to set up the Raspberry PI.
I chose [Archlinux ARM](http://archlinuxarm.org/platforms/armv6/raspberry-pi) because of its faster boot times
and minimal setup, it does not come with an Xserver pre-installed or any other bloatware like the Raspbian OS.

Follow the installation instructions on the page above, plug in ethernet, HDMI and a keyboard and you're ready to go.
Login with the default `root` user and the default `root` password and run `ifconfig` or `ip addr show eth0` to determine your IP address. Now you can SSH into your PI using that address.


### GPIO Interface

To read and send data through the GPIO pins I've decided to use [wiringPi](http://wiringpi.com/). It's a C library, the library feels much like using the Arduino wiring system.

[Download and install](http://wiringpi.com/download-and-install/) wiringPi and run `gpio` to see if it installed correctly.


### Raspberry PI GPIO

Here is the setup for the GPIO.

Physical  | BCM GPIO | WiringPi | Component | ---
--------- | -------- | -------- | --------- | ---
7         | 4        | 7        | LED       |
11        | 17       | 0        | Switch    |
12        | 18       | 1        | Pushbutton|
15        | 22       | 3        | Green     | Clock |
16        | 23       | 4        | White     | Data  |

And here is the WS2801 spec.

|||
--- | ---
Red   | 5V    
Blue  | GND   
Green | Clock 
White | Data

---

## LEDs

### Blinking a led

To test if everything works correctly, I've started with a simple blink example written in C.
It siply blinks the LED on GPIO pin 4.

```c
#include <wiringPi.h>
#include <stdio.h>

int main (int argc, char *argv[])
{
int pin, i;
scanf("%d", &pin);
printf("pin %d \n", pin);

if (wiringPiSetup() == -1)
    exit (1);

pinMode(pin, OUTPUT);

for (i = 0; i < 10; i++) {
   printf("LED %d ON\n", pin);
   digitalWrite(pin, 1);
   delay(50);
   printf("LED %d OFF\n", pin);
   digitalWrite(pin, 0);
   delay(50);
}

return 0;
}
```

### Controlling the LED array.

Next step is to try to get the LED array to work. I've had some trouble with it and this is the part where I've been stuck in for a while. I had placed delays on soem parts of the code and it would cause incorrect clock timing causing the LEDs to misbehave. After stripping out the delays and setting the clock to go from LOW to HIGH it worked.

As a starting point, the LEDs would received a full [white](https://github.com/Illyism/Raspberry-PI-Led/blob/master/src/white.c) colour. Then a [random](https://github.com/Illyism/Raspberry-PI-Led/blob/master/src/random.c) color.


### Making a socket

And when everything was working correctly, it was time to move on to the [next step](https://github.com/Illyism/Raspberry-PI-Led/blob/master/src/led.c) to making the LEDs be able to receive any type of data from any kind of interface. I've used a socket that first listens for any established connections and then listens to any data in the form of bits.

So all that is required is to send a bit stream to the socket, the interface waits for enough data to fill up all the leds then sends the data through the GPIO and flushes the buffer and starts over to listening to any data.


### Making a server

To interact with the socket, I've decided on adding [another server](https://github.com/Illyism/Raspberry-PI-Led/blob/master/server/socket.js) written in Node to make it easier to interact with the LEDs, I wanted to have an easy to control [API](https://github.com/Illyism/Raspberry-PI-Led/blob/master/server/server.js) so I can send data in HEX colours, RGB colours, add in effects such as loops, rainbows, timers and so on.



### Connecting to the server

And finally, for the end-user, to interact with the server there is a [client](https://github.com/Illyism/Raspberry-PI-Led/tree/master/client), that could be a HTML web server or a [CLI](https://github.com/Illyism/Raspberry-PI-Led/blob/master/client/client.js) application.


---

## Webserver

### Nginx

Nginx is a HTTP and reverse proxy server. It is faster and easier compared to Apache.
In Arch, you can simply install it with `pacman -S nginx`. The configuration is in `/etc/nginx`.

```bash➜
➜ pacman -S nginx➜
➜ cd /etc/nginx
➜ cat nginx.conf | grep -Ev '(#.*$)|(^$)' > nginx.conf
➜ cp /usr/share/nginx/html/* /srv/http
```

Then change the configuration to load file from `/srv/http`.

```
location / {
  root   /srv/http;
  index  index.html index.htm;
}
location = /50x.html {
    root   /srv/http;
}
```



# Ref

* http://www.linuxhowtos.org/C_C++/socket.htm
