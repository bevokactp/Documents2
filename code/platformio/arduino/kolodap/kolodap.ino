
// display

#include <EEPROM.h>

#include <microDS3231.h>

MicroDS3231 rtc(0x68);

void setup() {
 
  Serial.begin(9600);
  
  // if set no time in eeprom
  if (!EEPROM.read(10)) {
    rtc.setTime(BUILD_SEC, BUILD_MIN, BUILD_HOUR, BUILD_DAY, BUILD_MONTH, BUILD_YEAR);
    Serial.println("!");
    EEPROM.update(10, true);
  }

  if (rtc.lostPower()) {            // выполнится при сбросе батарейки
    Serial.println("lost power!");
    rtc.setTime(BUILD_SEC, BUILD_MIN, BUILD_HOUR, BUILD_DAY, BUILD_MONTH, BUILD_YEAR);
  }

  Serial.print(rtc.getHours());
  Serial.print(":");
  Serial.print(rtc.getMinutes());
  Serial.print(":");
  Serial.print(rtc.getSeconds());
  Serial.print(" ");
  Serial.print(rtc.getDay());
  Serial.print(" ");
  Serial.print(rtc.getDate());
  Serial.print("/");
  Serial.print(rtc.getMonth());
  Serial.print("/");
  Serial.println(rtc.getYear());
  
  // выводим температуру модуля
  Serial.print(rtc.getTemperatureFloat());Serial.println(" *");
  
  // выводим дату и время готовыми строками
  Serial.println(rtc.getTimeString());
  Serial.println(rtc.getDateString());
}

void loop() {
  // получаем и выводим каждый элемент отдельно
}
