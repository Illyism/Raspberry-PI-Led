# Raspberry PI + WS2801 LEDs

For a more detailed documentation, read the [PDF](https://github.com/Illyism/Raspberry-PI-Led/blob/master/README.pdf).


## Installation

### Raspberry Pi

First, download and install [wiringPi](http://wiringpi.com/download-and-install/).

Then clone this repository and install the LED driver.
Change your clock, data and pin count if necessary and compile it.

```bash
git clone https://github.com/Illyism/Raspberry-PI-Led.git
make led

bin/led
```

### Server

On the same Raspberry Pi, or another server. Install [Node](http://nodejs.org/). Clone this repository and run the server application.

Configure the server/config.js file or launch with variables:

* SOCKET_HOST: The hostname or IP of your Raspberry PI. Default is **localhost**
* SOCKET_PORT: Port of your LED driver. Default is **4561**
* HOST: The hostname to bind to
* PORT: The port to bind to
* LED_COUNT: Amount of LEDs on the WS2801 strip
* LED_AUTOMATIC: Automatically send the bits to the strip on changes

```bash
git clone https://github.com/Illyism/Raspberry-PI-Led.git

cd server
npm install

node server.js

```

### Client

On your client device, or still on the same Raspberry Pi, run the client application with Node.


Configure the client/config.js file or launch with variables:

* HOST: The hostname of the server
* PORT: The port of the server

```bash
git clone https://github.com/Illyism/Raspberry-PI-Led.git

cd client
npm install

node website
```

The web application will then launch on http://localhost:3000

![](http://i.il.ly/client.jpg)
