#include <GyverHX711.h>
GyverHX711 sensor(2, 3, HX_GAIN64_A);
// HX_GAIN128_A - канал А усиление 128
// HX_GAIN32_B - канал B усиление 32
// HX_GAIN64_A - канал А усиление 64

void setup() {
  Serial.begin(9600);
  
  // если тарирование при первом запуске -
  // нужно выждать готовность датчика
  delay(500);
  sensor.tare();    // калибровка нуля
  
  //sensor.sleepMode(true);		// выключить датчик
  //sensor.sleepMode(false);	// включить датчик
}

int val;
void loop() {
  // чтение только по доступности! if available
  if (sensor.available()) {
    val = sensor.read();
    if (val > 0)
      Serial.println(val);
  }
  delay(100);
}