
#include <Arduino.h>


uint8_t * split_digit_length_10_on_digits(long digit){
  uint8_t bytes[10];      // буфер
  uint8_t amount;           // количество цифр в числе
  for (byte i = 0; i < 10; i++) { //>
    bytes[i] = digit % 10; // записываем остаток в буфер
    digit /= 10;         // "сдвигаем" число
    if (digit == 0) {    // если число закончилось
      amount = i;       // запомнили, сколько знаков
      break;
    }
  }
  // хранит цифры в обратном порядке
  return bytes;
}

long merge_digit_length_10_on_digits(uint8_t* ui8pu){
  long number = 0;
  for (byte i = 0; i < sizeof(ui8pu) / sizeof(ui8pu[0]); i++) {
    number += ui8pu[i];  // пишем следующую цифру
    number *= 10;         // "сдвигаем" число
  }
  number /= 10; // убираем лишнее умножение на 10
}

long division_int_with_round_up(const long a, const long b){
  return (long)(a + b - 1) / b;  
}

long * split_int_to_bytes_and_merge_back(long digit){
  int val = 1234, val2;
  byte b1, b2;
  // разбиваем val на байты
  b1 = val >> 8;          // старший байт
  b2 = val & 0xFF;        // младший байт
  val2 = b2 | (b1 << 8);  // склеиваем обратно
  // тут val2 == 1234
}

// принимает HEX число в виде текста в формате ABC123, 0xABC123, #ABC123 с буквами в верхнем и нижнем регистре (abc123, 0xabc123, #abc123) и 
// преобразовывает в целочисленный uint32_t. Версии для String и char*:
uint32_t String_8_HEX(String hex) {  
  uint8_t s = 0;
  if (hex[0] == '#') s = 1;
  if (hex[1] == 'x') s = 2;
  uint8_t len = hex.length() - s;
  uint32_t val = 0;
  for (int i = 0; i < len; i++) {
    val <<= 4;
    uint8_t d = hex[i + s];
    d -= (d <= '9') ? 48 : ((d <= 'F') ? 55 : 87);
    val |= d;
  }
  return val;
}

uint32_t cstring_8_HEX(char* hex) {  
  uint8_t s = 0;
  if (hex[0] == '#') s = 1;
  if (hex[1] == 'x') s = 2;
  uint8_t len = strlen(hex) - s;
  uint32_t val = 0;
  for (int i = 0; i < len; i++) {
    val <<= 4;
    uint8_t d = hex[i + s];
    d -= (d <= '9') ? 48 : ((d <= 'F') ? 55 : 87);
    val |= d;
  }
  return val;
}
