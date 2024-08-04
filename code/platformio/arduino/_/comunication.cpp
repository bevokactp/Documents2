
#include <Arduino.h>
#include "Wire.h"


// не полная перезагрузка, содержимое оперативной памяти и состояния регистров не изменятся:
// asm volatile
// (
//   "cli \n\t"
//   "jmp 0x0000 \n\t"
// );

// сканирует адресное пространство шины I2C и выводит адреса обнаруженных устройств в последовательный порт}
// void loop() {
void i2c_scan(){
  for (uint8_t i = 1; i < 128; i++) {
    Wire.beginTransmission(i);
    if (!Wire.endTransmission()) {
      Serial.print("0x");
      Serial.println(i, HEX);
    }
  }
  delay(1000);
}
// }

void UART_begin(uint32_t baudrate) {
  /*
  UART_begin(бод) - запустить
  UART_write(byte) - отправить байт
  UART_available() - проверка на входящий
  UART_read() - прочитать байт
  UART_end() - выключить
  void setup() {
    UART_begin(9600);
    UART_write(40);  // отправить байт 40
    UART_write(40);
  }

  void loop() {
    if (UART_available()) {      // если есть что на приём
      byte data = UART_read();   // прочитать
      UART_write(data);          // отправить обратно
    }
  }
  */
  uint16_t speed = (F_CPU / (8L * baudrate)) - 1;
  UBRR0H = highByte(speed);
  UBRR0L = lowByte(speed);
  UCSR0A = (1 << U2X0);
  UCSR0B = (1 << TXEN0) | (1 << RXEN0);
  UCSR0C = (1 << UCSZ01) | (1 << UCSZ00);
}

void UART_write(byte data) {
  while (!(UCSR0A & (1 << UDRE0)));
  UDR0 = data;
}

bool UART_available() {
  return (UCSR0A & (1 << RXC0));
}

byte UART_read() {
  byte data = UDR0;
  return data;
}

void UART_end() {
  UCSR0B = 0;
}


// используем минимальный набор для Serial
// стандартный читаемый вывод делает встроенный в ядро Print.h
#include "Print.h"
class Uart : public Print {
  public:
    void begin(uint32_t baudrate) {
      uint16_t speed = (F_CPU / (8L * baudrate)) - 1;
      UBRR0 = speed;
      UCSR0A = (1 << U2X0);
      UCSR0B = (1 << TXEN0) | (1 << RXEN0);
      UCSR0C = (1 << UCSZ01) | (1 << UCSZ00);
    }
    void end() {
      UCSR0B = 0;
    }
    size_t write(uint8_t data) {
      while (!(UCSR0A & (1 << UDRE0)));
      UDR0 = data;
    }
    bool available() {
      return (UCSR0A & (1 << RXC0));
    }
    char read() {
      byte data = UDR0;
      return data;
    }
  private:
};
/*
Uart uart;
void setup() {
  uart.begin(9600);
  uart.println("Hello ");
  uart.println(123456);
  // также есть
  // uart.end();
  // uart.write();
  // uart.available();
  // uart.read();
}
void loop() {}
*/
