/*
Показывает график потребления
Arduino power benchmark

nano pin 20 mA
mini pin 40 mA
usb 500 ma

*/

#include <Arduino.h>


// Тест скорости выполнения команд Arduino
// Просто помести свой код внутри test() и загрузи прошивку!
inline __attribute__((always_inline))
void test(void) {
  asm ("nop");
}

volatile uint16_t cnt_ovf = 0;
/*
void setup() {
  Serial.begin(9600);
  TCCR1A = TCCR1B = TCNT1 = cnt_ovf = 0;  // Сброс таймера
  TIFR1 = (1 << TOV1);
  TIMSK1 = (1 << TOIE0);                  // Прерывание переполнения
  TCCR1B = (1 << CS10);                   // Старт таймера
  test();                                 // тест
  TCCR1B = 0;                             // остановить таймер
  uint32_t count = TCNT1 - 2;             // минус два такта на действия
  count += ((uint32_t)cnt_ovf * 0xFFFF);  // с учетом переполнений
  
  Serial.print("ticks: ");
  Serial.println(count);
  Serial.print("time (us): ");
  Serial.println(count * (float)(1000000.0f / F_CPU), 4);
}
ISR(TIMER1_OVF_vect) {
  cnt_ovf++;
}
*/

// reurn заряд в процентах по ёмкости! Интерполировано вручную по графику разряда ЛИТИЕВОГО аккумулятора
uint8_t return_power_as_percent() {
  int volts = analogRead(0) * 5 * (float)0.977;    // несовсем корректно, так как 5 вольт ровно не бывает. Смотри предыдущий пример
  if (volts > 3870)
    return map(volts, 4200, 3870, 100, 77);
  else if ((volts <= 3870) && (volts > 3750) )
    return map(volts, 3870, 3750, 77, 54);
  else if ((volts <= 3750) && (volts > 3680) )
    return map(volts, 3750, 3680, 54, 31);
  else if ((volts <= 3680) && (volts > 3400) )
    return map(volts, 3680, 3400, 31, 8);
  else if (volts <= 3400)
    return map(volts, 3400, 2600, 8, 0);
}
