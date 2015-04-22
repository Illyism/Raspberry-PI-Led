#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h> 
#include <sys/socket.h>
#include <netinet/in.h>

#include <wiringPi.h>

int sockfd, newsockfd, portno;
char buffer[256];
int n, m;

int PIN_CLOCK = 3; // | 15 | GPIO 22
int PIN_DATA = 4;  // | 16 | GPIO 23
int LED_COUNT = 10;
char rgb_buffer[10*3*8] = "";

void error(const char *msg)
{
    perror(msg);
    exit(1);
}

int led_listen() {
  bzero(buffer,256);
  n = read(newsockfd, buffer, 255);
  strcat(rgb_buffer, buffer);
  printf("%s\n",rgb_buffer);
  return n;
}

void led_write_bit(int bit) {
  digitalWrite(PIN_CLOCK, LOW);
  digitalWrite(PIN_DATA, bit == '1');
  digitalWrite(PIN_CLOCK, HIGH); 
}

void led_write_buffer() {
  // int len = strlen(rgb_buffer);
  int i;
  for (i = 0; rgb_buffer[i] != 0; i++) {
    led_write_bit(rgb_buffer[i]);
  }
}

int led_respond() {
  m = write(newsockfd, "OK", 3);
  return m;
}

int main(int argc, char *argv[])
{
  if (wiringPiSetup() == -1) {
    exit(1);
  }
  
  pinMode(PIN_CLOCK, OUTPUT);
  pinMode(PIN_DATA, OUTPUT);

  if (argc < 2) {
    portno = 4561;
    fprintf(stderr, "Listening on port %d\n", portno);
  } else {
    portno = atoi(argv[1]);
  }

  socklen_t clilen;
  struct sockaddr_in serv_addr, cli_addr;

  sockfd = socket(AF_INET, SOCK_STREAM, 0);
  if (sockfd < 0) 
    error("ERROR opening socket");
  bzero((char *) &serv_addr, sizeof(serv_addr));

  serv_addr.sin_family = AF_INET;
  serv_addr.sin_addr.s_addr = INADDR_ANY;
  serv_addr.sin_port = htons(portno);

  if (bind(sockfd, (struct sockaddr *) &serv_addr,
      sizeof(serv_addr)) < 0) 
      error("ERROR on binding");
  listen(sockfd,5);
  clilen = sizeof(cli_addr);
  newsockfd = accept(sockfd, 
             (struct sockaddr *) &cli_addr, 
             &clilen);

  if (newsockfd < 0) 
      error("ERROR on accept");

  while (led_listen() > 0) {}

  close(newsockfd);
  close(sockfd);
  return 0; 
}
