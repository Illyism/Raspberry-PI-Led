/*
 * blink.c:
 *      Simple test program to blink an LED on specified pin
 */
 
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

  for (i = 0; i < 10; i++){
    printf("LED %d On\n", pin);
    digitalWrite(pin, 1);
    delay(50);
    printf("LED %d Off\n", pin);
    digitalWrite(pin, 0);
    delay(50);
  }
 
  return 0;
}
