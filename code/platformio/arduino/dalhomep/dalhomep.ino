
#include "Adafruit_VL53L0X.h"
 
#define ULTRASONIC_HC_TRIG 3
#define ULTRASONIC_HC_ECHO 2

Adafruit_VL53L0X lox = Adafruit_VL53L0X();

void setup() {
  Serial.begin(9600);
 
  pinMode(ULTRASONIC_HC_TRIG, OUTPUT); // trig выход
  pinMode(ULTRASONIC_HC_ECHO, INPUT);  // echo вход

  // wait until serial port opens for native USB devices
  while (! Serial) {
    delay(1);
  }
 
  if (!lox.begin()) {
    Serial.println(F("Failed to boot VL53L0X"));
    while(1);
  }
}


void loop() {
  
  uint16_t ultrasonic_value = 24;           // представим, что получили с датчика
  int ultrasonic_dist = get_ultrasonic_mm(ultrasonic_value);  // получаем расстояние в мм
  Serial.print(ultrasonic_dist); Serial.println(" mm");

  VL53L0X_RangingMeasurementData_t measure;
  lox.rangingTest(&measure, false); // pass in 'true' to get debug data printout!
 
  if (measure.RangeStatus != 4) {  // phase failures have incorrect data
    Serial.print(measure.RangeMilliMeter);Serial.println(F(" mm")); 
  } else {
    Serial.println(" out of range ");
  }
  delay(50);
}

// Коррекция по температуре, результат в мм
int get_ultrasonic_mm(int ultrasonic_value) {
  // импульс 10 мкс
  digitalWrite(ULTRASONIC_HC_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(ULTRASONIC_HC_TRIG, LOW);
  // измеряем время ответного импульса
  uint32_t us = pulseIn(ULTRASONIC_HC_ECHO, HIGH);
  // считаем расстояние и возвращаем
  return (us * (ultrasonic_value * 6 / 10 + 330) / 2000ul);
}
