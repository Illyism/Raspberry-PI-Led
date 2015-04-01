# Raspberry-PI-Led

For the NMCT Data Communication project. Using WS2801.

1. [Setting up the Raspberry PI](#setting-up-the-raspberry-pi)
2. [GPIO Interface](#gpio-interface)
3. [Raspberry PI GPIO](#raspberry-pi-gpio)
4. [Blinking a LED](#blinking-a-led)
5. [Webserver](#webserver)
5.1. [Nginx](#nginx)


## Setting up the Raspberry PI

The first step is to set up the Raspberry PI.
I chose [Archlinux ARM](http://archlinuxarm.org/platforms/armv6/raspberry-pi) because of its faster boot times
and minimal setup, it does not come with an Xserver pre-installed or any other bloatware like the Raspbian OS.

Follow the installation instructions on the page above, plug in ethernet, HDMI and a keyboard and you're ready to go.
Login with the default `root` user and the default `root` password and run `ifconfig` or `ip addr show eth0` to determine
your IP address. Now you can SSH into your PI using that address.


## GPIO Interface

To read and send data through the GPIO pins I've decided to use [wiringPi](http://wiringpi.com/). It's a C library, the library
feels much like using the Arduino wiring system.



## Raspberry PI GPIO

Here is the setup for the GPIO.

Header | GPIO | Component
--- | --- | ---
7  | 4  | LED        |
11 | 17 | Switch     |
12 | 18 | Pushbutton |
15 | 22 | Green      |
16 | 23 | White      |

And here is the WS2801 spec.

|||
--- | ---
Rood  | 5V    
Blauw | GND   
Groen | Clock 
Wit   | Data

## Blinking a led

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
