/*
 * blink.c:
 *      Simple test program to blink an LED on pin 7
 */
 
#include <wiringPi.h>
#include <stdio.h>
 
int main (int argc, char *argv[])
{
  int pin;
  printf("Pin Number: ");
  scanf("%d", &pin);


  printf("pin %d \n", pin);  
  if (wiringPiSetup() == -1)
    exit (1);
 
  pinMode(pin, OUTPUT);

  int i, j;

  for (j = 0; j < 40; j++) {

  pin = j;
  for (i = 0; i < 10; i++){
    printf("LED %d On\n", pin);
    digitalWrite(pin, 1);
    delay(50);
    printf("LED %d Off\n", pin);
    digitalWrite(pin, 0);
    delay(50);
  }
  }
 
  return 0;
}
