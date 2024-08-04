
#include <Arduino.h>

/*
void setup() {
  pinMode(2, 2); // внешняя подтяжка лучше длоя энергосбережения!
  Serial.begin(9600);
  Serial.println("hello!");
  delay(500);
  Serial.println("go to sleep");
  delay(500);
  attachInterrupt(0, wakeUp, LOW);  // вкл прерывание пробуждения
  goToSleep();  // отправка в сон
  delay(1000);  // после сна
  Serial.println("im back in business");  // продолжили работу
}
void loop() {}
*/

// сон, без отключения АЦП и прочих жрущих блоков для полноценного комфортного сна используйте GyverPower
void wakeUp() {
  // uncomment error
  // detachInterrupt(0);    // откл прерывание пробуждения
  SMCR &= ~ (1 << SE);   // запретили сон
  Serial.println("five more minutes,pls"); // сказали что проснулись
}
void goToSleep() {  
  SMCR |= (1 << SM1);         // настроили сон как powerDown
  SMCR |= (1 << SE);         // разрешили сон
  asm volatile ("sleep");       // инструкция сна
}
