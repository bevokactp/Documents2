
#define F_CPU 8000000UL

#include <avr/io.h>
#include <util/delay.h>


int main_assembly(void) {
  asm volatile
  (
    "ldi R16, 0b00100000 \n"
    "out 0x04, R16 \n"
  );

  while (1) {
    asm volatile
    (
      "ldi R16, 0b00000000 \n"
      "out 0x05, R16 \n"
    );
    delay(250);
    asm volatile
    (
      "ldi R16, 0b00100000 \n"
      "out 0x05, R16 \n"
    );
    delay(500);    
  }
}


int main_avr(void) {
  
  PORTB &= ~(1 << PORTB5);
 // DDRB = 0;
 // DDRB = 0b000700000; 
  DDRB &= ~(1 << PB0);
  while (1) {
        PORTB |= (1 << PORTB5);
        _delay_ms(250);
        PORTB &= ~(1 << PORTB5);
        _delay_ms(500);
  }
}



int main() {
  main_avr();
  // main_assembly();
  return 0;
}