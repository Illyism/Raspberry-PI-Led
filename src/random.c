/*
 * ledon.c:
 * Turn leds on
 */
 
#include <wiringPi.h>
#include <stdio.h>
#include <stdlib.h>
 
int PIN_CLOCK = 3; // | 15 | GPIO 22
int PIN_DATA = 4;  // | 16 | GPIO 23
int PIN_LED = 7;
int LED_COUNT = 10;
time_t t;
int c;

void setColor() {
  int bit = rand() % 2;
  digitalWrite(PIN_CLOCK, LOW);
  digitalWrite(PIN_DATA, bit);
  digitalWrite(PIN_CLOCK, HIGH); 
}

int main (int argc, char *argv[])
{
  int i, j;
  if (wiringPiSetup() == -1) {
    exit(1);
  }
  srand((unsigned) time(&t));
 
  pinMode(PIN_CLOCK, OUTPUT);
  pinMode(PIN_DATA, OUTPUT);
  pinMode(PIN_LED, OUTPUT);

  for (i = 0; i < LED_COUNT; i++) {
    for (j = 0; j < 8; j++) setColor();
    for (j = 0; j < 8; j++) setColor();
    for (j = 0; j < 8; j++) setColor();
  }
 
 return 0;
}
