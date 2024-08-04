

#include <Arduino.h>

// пример использования PCINT - прерывания на любом пине
// прерывание вызывается при переключении состояния любого пина из группы
// наши обработчики прерываний
ISR(PCINT0_vect) {  // пины 8-13
}
ISR(PCINT1_vect) {  // пины A0-A5
}
ISR(PCINT2_vect) {  // пины 0-7
}
// функция для настройки PCINT
uint8_t attachPCINT(uint8_t pin) {
  if (pin < 8) {            // D0-D7 (PCINT2)
    PCICR |= (1 << PCIE2);
    PCMSK2 |= (1 << pin); return 2; } else if (pin > 13) {    //A0-A5 (PCINT1)
    PCICR |= (1 << PCIE1);
    PCMSK1 |= (1 << pin - 14);
    return 1;
  } else {                  // D8-D13 (PCINT0)
    PCICR |= (1 << PCIE0);
    PCMSK0 |= (1 << pin - 8);
    return 0;
  }
}
// быстрый digitalRead для опроса внутри ISR
// пригодится для проверки конкретного пина
bool pinDigitalRead(uint8_t pin) {
  if (pin < 8) {
    return bitRead(PIND, pin);
  } else if (pin < 14) {
    return bitRead(PINB, pin - 8);
  } else if (pin < 20) {
    return bitRead(PINC, pin - 14);
  }
}


// прицепляем аппаратные прерывания напрямую (пин, тип)
void attachInterruptFast(uint8_t num, uint8_t type) {
  switch (num) {          
    case 0:
      EICRA = (EICRA & 0x0C) | type;  // Setup interrupt type
      bitSet(EIMSK, INT0);        // Enable external interrupt
      return;
    case 1:
      EICRA = (EICRA & 0x03) | (type << 2);
      bitSet(EIMSK, INT1);
      return;
  }
}

void detachInterruptFast(uint8_t num) {
  bitClear(EIMSK, num);          // Disable external interrupt
}
// векторы. В них будет прыгать прерывание
ISR(INT0_vect) {}
ISR(INT1_vect) {}

