
#include <Arduino.h>


// храним флаги как 1 бит

// макросы
#define B_TRUE(bp,bb)    (bp) |= (bb)
#define B_FALSE(bp,bb)   (bp) &= ~(bb)
#define B_READ(bp,bb)    bool((bp) & (bb))

// вот так храним наши флаги, значения обязательно как степени двойки!
#define B_FLAG_1        1
#define B_FLAG_2        2
#define B_LED_STATE     4
#define B_BUTTON_STATE  8
#define B_BUTTON_FLAG   16
#define B_SUCCESS       32
#define B_END_FLAG      64
#define B_START_FLAG    128

// этот байт будет хранить 8 бит
byte boolPack1 = 0;

void setup2() {
  // суть такая: макрос функциями мы ставим/читаем бит в байте boolPack1

  // записать true во флаг B_BUTTON_STATE
  B_TRUE(boolPack1, B_BUTTON_STATE);

  // записать false во флаг B_FLAG_1
  B_FALSE(boolPack1, B_FLAG_1);

  // прочитать флаг B_SUCCESS (для примера читаем в булин переменную)
  boolean successFlag = B_READ(boolPack1, B_SUCCESS);

  // либо используем в условии
  if (B_READ(boolPack1, B_SUCCESS)) {
    // выполнить при выполнении условия
  }
}

// вариант упаковки флагов в массив. ЛУЧШЕ И УДОБНЕЕ ПРЕДЫДУЩИХ ПРИМЕРОВ!

#define NUM_FLAGS 30                // количество флагов
byte flags[NUM_FLAGS / 8 + 1];      // массив сжатых флагов

// ============== МАКРОСЫ ДЛЯ РАБОТЫ С ПАЧКОЙ ФЛАГОВ ==============
// поднять флаг (пачка, номер)
#define setFlag(flag, num) bitSet(flag[(num) >> 3], (num) & 0b111)

// опустить флаг (пачка, номер)
#define clearFlag(flag, num) bitClear(flag[(num) >> 3], (num) & 0b111)

// записать флаг (пачка, номер, значение)
#define writeFlag(flag, num, state) ((state) ? setFlag(flag, num) : clearFlag(flag, num))

// прочитать флаг (пачка, номер)
#define readFlag(flag, num) bitRead(flag[(num) >> 3], (num) & 0b111)

// опустить все флаги (пачка)
#define clearAllFlags(flag) memset(flag, 0, sizeof(flag))

// поднять все флаги (пачка)
#define setAllFlags(flag) memset(flag, 255, sizeof(flag))
// ============== МАКРОСЫ ДЛЯ РАБОТЫ С ПАЧКОЙ ФЛАГОВ ==============

// Serial.begin(9600);

// clearAllFlags(flags);

// writeFlag(flags, 0, 1);
// writeFlag(flags, 10, 1);
// writeFlag(flags, 12, 1);
// writeFlag(flags, 15, 1);
// writeFlag(flags, 15, 0);
// writeFlag(flags, 29, 1);

// // выводим все
// for (byte i = 0; i < NUM_FLAGS; i++)
//   Serial.print(readFlag(flags, i));
