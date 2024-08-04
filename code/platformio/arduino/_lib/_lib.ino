
#include "config.h"
#include "includes.h"

#include <EncButton.h>


#include "library.h"

#define LED_PIN 13
#define TIMER_DELAY 1000

uint16_t timer = 0;
bool flag = true;

void setup(){
  Serial.begin(9600);

  pinMode(LED_PIN, OUTPUT);

  libr::getVersion();
  getVersion();

}

void loop(){
  if (millis() - timer >= TIMER_DELAY) {
    digitalWrite(LED_PIN, flag);
    flag = !flag;
    timer = millis();
  }
}

void getVersion() {
  Serial.println("main version");
}
