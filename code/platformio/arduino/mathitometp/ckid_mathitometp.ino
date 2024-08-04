
#include <QMC5883LCompass.h>

#define PERIOD_TIMER_COMPASS_UPDATE_READ_DATA 1000
#define PERIOD_TIMER_CALIBRATION 5000
#define PERIOD_TIMER_BLINK_LED 1000
#define TIME_DELAY_FOR_START_TRIGGER 5000
#define TRIGGER_DIFFERENCE_LOCATION 50

#define LED_PIN 13

QMC5883LCompass compass;

uint32_t timer = 0;
int x_old, y_old, z_old;

void setup() {
  Serial.begin(9600);

  compass.init();

  pinMode(LED_PIN, OUTPUT);

  // calibration with high led
  digitalWrite(LED_PIN, HIGH);
  calibrate(compass);
  digitalWrite(LED_PIN, LOW);
}

void loop() {
    
    if (millis() - timer >= PERIOD_TIMER_COMPASS_UPDATE_READ_DATA) {
    
      int x, y, z;

      compass.read();

      x = compass.getX();
      y = compass.getY();
      z = compass.getZ();

      if (timer > TIME_DELAY_FOR_START_TRIGGER) {          
        if (
          (abs(x - x_old) >= TRIGGER_DIFFERENCE_LOCATION) || 
          (abs(y - y_old) >= TRIGGER_DIFFERENCE_LOCATION) ||
          (abs(z - z_old) >= TRIGGER_DIFFERENCE_LOCATION) 
        ) {
          Serial.println();
          Serial.print(" X: ");Serial.print(abs(x - x_old));
          Serial.print(" Y: ");Serial.print(abs(y - y_old));
          Serial.print(" Z: ");Serial.print(abs(z - z_old));
          digitalWrite(LED_PIN, HIGH);
        }
      } else {
        x_old = x;
        y_old = y;
        z_old = z;
      }
      timer = millis();
    }
}

void calibrate(QMC5883LCompass compass) {
  Serial.println("Calibration ...");
  delay(5000);
  compass.calibrate();
  Serial.print("compass.setCalibrationOffsets(");
  Serial.print(compass.getCalibrationOffset(0));
  Serial.print(", ");
  Serial.print(compass.getCalibrationOffset(1));
  Serial.print(", ");
  Serial.print(compass.getCalibrationOffset(2));
  Serial.println(");");
  Serial.print("compass.setCalibrationScales(");
  Serial.print(compass.getCalibrationScale(0));
  Serial.print(", ");
  Serial.print(compass.getCalibrationScale(1));
  Serial.print(", ");
  Serial.print(compass.getCalibrationScale(2));
  Serial.println(");");
  Serial.println("... done");
}
