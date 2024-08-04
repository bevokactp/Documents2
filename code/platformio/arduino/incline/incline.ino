
#include "MPU6050.h"

#define ANGLE_MEASURE_PERIOD 1000
#define ANGLE_TRIGGER 7
#define BLINK_PERIOD 1000

#define LED_PIN 3

uint32_t timer_for_measuring_angle = 0;

float angle_x_old = 0, angle_y_old = 0, angle_z_old = 0;
float angle_x, angle_y, angle_z;
float angle_x_diff, angle_y_diff, angle_z_diff;

MPU6050 mpu;


void setup() {
  Wire.begin();
  Serial.begin(9600);
  
  pinMode(LED_PIN, OUTPUT);

  mpu.initialize();     // запускаем датчик

  // blink();
}

void loop() {
  if ((millis() - timer_for_measuring_angle) >= ANGLE_MEASURE_PERIOD) {

    angle_x = determinateAngleTriangulary(mpu.getAccelerationX());
    angle_y = determinateAngleTriangulary(mpu.getAccelerationY());
    angle_z = determinateAngleTriangulary(mpu.getAccelerationZ());

    angle_x_diff = abs(angle_x - angle_x_old);
    angle_y_diff = abs(angle_y - angle_y_old);
    angle_z_diff = abs(angle_z - angle_z_old);
    
    if ((angle_x_old != 0) && (angle_y_old != 0) && (angle_z_old != 0)) {      

      if ((angle_x_diff >= ANGLE_TRIGGER) || (angle_y_diff >= ANGLE_TRIGGER) || (angle_z_diff >= ANGLE_TRIGGER)) {
       
        Serial.println("!!!!!!!!!!!!!!!!!!!!!!!!!!");

        digitalWrite(LED_PIN, HIGH);
        delay(3000);
        digitalWrite(LED_PIN, LOW);
      }
    }
       
        Serial.println("--------------------------");
        Serial.print(angle_x);Serial.print('\t');
        Serial.print(angle_y);Serial.print('\t');
        Serial.print(angle_z);Serial.println('\t');

        Serial.print(angle_x_old);Serial.print('\t');
        Serial.print(angle_y_old);Serial.print('\t');
        Serial.print(angle_z_old);Serial.println('\t');

        Serial.print(angle_x_diff);Serial.print('\t');
        Serial.print(angle_y_diff);Serial.print('\t');
        Serial.print(angle_z_diff);Serial.println('\t');

    angle_x_old = angle_x;
    angle_y_old = angle_y;
    angle_z_old = angle_z;

    timer_for_measuring_angle = millis();
  }
}

float determinateAngleTriangulary(int16_t accaleration){
    accaleration = constrain(accaleration, -16384, 16384);    // ограничиваем +-1g
    float angle = accaleration / 16384.0;           // переводим в +-1.0
    // и в угол через арксинус
    if (angle < 0) angle = 90 - degrees(acos(angle));
    else angle = degrees(acos(-angle)) - 90;
    return angle;    
}

void blink(){
  float count_blink = 6;
  bool flag = true;
  digitalWrite(LED_PIN, flag);
  while (count_blink > 0) {
    digitalWrite(LED_PIN, flag);
    flag = !flag;
    count_blink--;
    delay(BLINK_PERIOD);
  } 
}

