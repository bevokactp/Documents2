
#include <Arduino.h>

#define EVERY_MS(x) \
  static uint32_t tmr;\
  bool flag = millis() - tmr >= (x);\
  if (flag) tmr += (x);\
  if (flag)
// Данный макрос заменяет “таймер на миллис” одной строчкой, без использования библиотек и создания классов! Пользоваться очень просто:
// помещаем каждый вызов в свой блок кода:
// void loop() {
//   {
//     EVERY_MS(100) {
//       // ваш код
//     }
//   }
  
//   {
//     EVERY_MS(500) {
//       // ваш код
//     }
//   }
  
// }


// возвращает количество дней с 01.01.2000 (день 1-30/31, месяц 1-12, год 2000-...)
int daySince2000(byte day, byte month, int year) {
  int days = day-1;                           // + день текущего месяца
  for (int i = 0; i < month - 1; i++) days += (i<7)?((i==1)?28:((i&1)?30:31)):((i&1)?31:30);
  if (month > 2 && (year & 3) == 0) days++;   // + високосный
  days += (year - 2000) * 365;              // + предыдущие года
  days += (year - 2000 + 3) / 4;            // + предыдущие високосные года
  return days;
}

// записывает дату дня с номером day2000 в переменные по ссылкам
void dayToDate(int day2000, byte &day, byte &month, int &year) {
  day2000++;
  int countDays = day2000;
  year = 0;
  while (countDays > 0) {
    year++;
    countDays -= 365;
    if ((year & 3) == 0) countDays--;
  }
  year--;
  day2000 -= year * 365;
  day2000 -= (year + 3) / 4;

  int days = 0;
  for (int i = 0; i < 12; i++) {
    int daysm = (i<7)?((i==1)?((year&3)==0?29:28):((i&1)?30:31)):((i&1)?31:30);
    if (day2000 <= days + daysm) {
      month = i + 1;
      day = day2000 - days;
      break;
    }
    days += daysm;
  }
}



// полные аналоги стандартным функциям времени
// пригодится, если работать без Arduino.h
// доступные функции
// необходимо вызвать uptime1Init() при запуске, чтобы всё завелось
void uptime1Init();
unsigned long millis0();
unsigned long micros0();
void delay0(unsigned long ms);
void delayMicroseconds0(unsigned int us);

// ==================== РЕАЛИЗАЦИЯ ==================
#define MICROSECONDS_PER_TIMER0_OVERFLOW (clockCyclesToMicroseconds(64 * 256))
#define MILLIS_INC (MICROSECONDS_PER_TIMER0_OVERFLOW / 1000)
#define FRACT_INC ((MICROSECONDS_PER_TIMER0_OVERFLOW % 1000) >> 3)
#define FRACT_MAX (1000 >> 3)
#define MICROS_MULT (64 / clockCyclesPerMicrosecond())
volatile unsigned long _timer0_overflow_count = 0;
volatile unsigned long _timer0_millis = 0;
static unsigned char timer0_fract = 0;

// uncomment
// void uptime1Init() {
//   sei();
//   TCCR0A = (1 << WGM01) | (1 << WGM00);
//   TCCR0B = (1 << CS01) | (1 << CS00);
//   TIMSK0 |= (1 << TOIE0);
// } ISR(TIMER0_OVF_vect) {
//   _timer0_millis += MILLIS_INC;
//   timer0_fract += FRACT_INC;
//   if (timer0_fract >= FRACT_MAX) {
//     timer0_fract -= FRACT_MAX;
//     _timer0_millis++;
//   }
//   _timer0_overflow_count++;
// }

unsigned long millis0() {
  uint8_t oldSREG = SREG;   // запомнинаем были ли включены прерывания
  cli();                    // выключаем прерывания
  unsigned long m = _timer0_millis;  // перехватить значение
  SREG = oldSREG;           // если прерывания не были включены - не включаем и наоборот
  return m;                 // вернуть миллисекунды
}

unsigned long micros0() {
  uint8_t oldSREG = SREG;     // запомнинаем были ли включены прерывания
  cli();                      // выключаем прерывания
  unsigned long m = _timer0_overflow_count;  // счет переполнений
  uint8_t t = TCNT0;                        // считать содержимое счетного регистра
  if ((TIFR0 & _BV(TOV0)) && (t < 255))     // инкремент по переполнению
    m++;
  SREG = oldSREG;                 // если прерывания не были включены - не включаем и наоборот
  return (long)(((m << 8) + t) * MICROS_MULT); // вернуть микросекунды
}

void delay0(unsigned long ms) {
  uint32_t start = micros0();
  while (ms > 0) { // ведем отсчет
    while ( ms > 0 && (micros0() - start) >= 1000) {
      ms--;
      start += 1000;
    }
  }
}

void delayMicroseconds0(unsigned int us) {
#if F_CPU >= 24000000L
  us *= 6; // x6 us, = 7 cycles
  us -= 5; //=2 cycles
#elif F_CPU >= 20000000L
  __asm__ __volatile__ (
    "nop" "\n\t"
    "nop" "\n\t"
    "nop" "\n\t"
    "nop"); //just waiting 4 cycles
  if (us <= 1) return; //  = 3 cycles, (4 when true)
  us = (us << 2) + us; // x5 us, = 7 cycles us -= 7; // 2 cycles #elif F_CPU >= 16000000L
  if (us <= 1) return; //  = 3 cycles, (4 when true)
  us <<= 2; // x4 us, = 4 cycles us -= 5; // = 2 cycles, #elif F_CPU >= 12000000L
  if (us <= 1) return; //  = 3 cycles, (4 when true)
  us = (us << 1) + us; // x3 us, = 5 cycles us -= 5; //2 cycles #elif F_CPU >= 8000000L
  if (us <= 2) return; //  = 3 cycles, (4 when true)
  us <<= 1; //x2 us, = 2 cycles
  us -= 4; // = 2 cycles
#else
  if (us <= 16) return; //= 3 cycles, (4 when true)
  if (us <= 25) return; //= 3 cycles, (4 when true), (must be at least 25 if we want to substract 22) us -= 22; // = 2 cycles us >>= 2; // us div 4, = 4 cycles
#endif
  __asm__ __volatile__ (
    "1: sbiw %0,1" "\n\t" // 2 cycles
    "brne 1b" : "=w" (us) : "0" (us) // 2 cycles
  );
}





// полные аналоги стандартным функциям времени
// пригодится, если работать без Arduino.h
// доступные функции
// необходимо вызвать uptime2Init() при запуске, чтобы всё завелось
void uptime2Init();
unsigned long millis2();
unsigned long micros2();
void delay2(unsigned long ms);
void delayMicroseconds2(unsigned int us);

// =================== РЕАЛИЗАЦИЯ ==================
#define MICROSECONDS_PER_TIMER2_OVERFLOW (clockCyclesToMicroseconds(64 * 256))
#define MILLIS2_INC (MICROSECONDS_PER_TIMER2_OVERFLOW / 1000)
#define FRACT2_INC ((MICROSECONDS_PER_TIMER2_OVERFLOW % 1000) >> 3)
#define FRACT2_MAX (1000 >> 3)
#define MICROS2_MULT (64 / clockCyclesPerMicrosecond())
volatile unsigned long timer2_overflow_count = 0;
volatile unsigned long timer2_millis = 0;
static unsigned char timer2_fract = 0;

void uptime2Init() {
  sei();
  TCCR2A = (1 << WGM20) | (1 << WGM21);
  TCCR2B = 1 << CS22;
  TIMSK2 = 1 << TOIE2; } ISR(TIMER2_OVF_vect) { timer2_millis += MILLIS2_INC; timer2_fract += FRACT2_INC; if (timer2_fract >= FRACT2_MAX) {
    timer2_fract -= FRACT2_MAX;
    timer2_millis++;
  }
  timer2_overflow_count++;
}
unsigned long millis2() {
  uint8_t oldSREG = SREG;           // запомнинаем были ли включены прерывания
  cli();                            // выключаем прерывания
  unsigned long m = timer2_millis;  // перехватить значение
  SREG = oldSREG;                   // если прерывания не были включены - не включаем и наоборот
  return m;                         // вернуть миллисекунды
}
unsigned long micros2() {
  uint8_t oldSREG = SREG;                   // запомнинаем были ли включены прерывания
  cli();                                    // выключаем прерывания
  unsigned long m = timer2_overflow_count;  // счет переполнений
  uint8_t t = TCNT2;                        // считать содержимое счетного регистра
  if ((TIFR2 & _BV(TOV2)) && (t < 255))     // инкремент по переполнению
    m++;
  SREG = oldSREG;                           // если прерывания не были включены - не включаем и наоборот
  return (long)(((m << 8) + t) * MICROS2_MULT); // вернуть микросекунды 
}

void delay2(unsigned long ms) { uint32_t start = micros2(); while (ms > 0) { // ведем отсчет
    while ( ms > 0 && (micros2() - start) >= 1000) {
      ms--;
      start += 1000;
    }
  }
}
void delayMicroseconds2(unsigned int us) {
#if F_CPU >= 24000000L
  us *= 6; // x6 us, = 7 cycles
  us -= 5; //=2 cycles
#elif F_CPU >= 20000000L
  __asm__ __volatile__ (
    "nop" "\n\t"
    "nop" "\n\t"
    "nop" "\n\t"
    "nop"); //just waiting 4 cycles
  if (us <= 1) return; //  = 3 cycles, (4 when true)
  us = (us << 2) + us; // x5 us, = 7 cycles us -= 7; // 2 cycles #elif F_CPU >= 16000000L
  if (us <= 1) return; //  = 3 cycles, (4 when true)
  us <<= 2; // x4 us, = 4 cycles us -= 5; // = 2 cycles, #elif F_CPU >= 12000000L
  if (us <= 1) return; //  = 3 cycles, (4 when true)
  us = (us << 1) + us; // x3 us, = 5 cycles us -= 5; //2 cycles #elif F_CPU >= 8000000L
  if (us <= 2) return; //  = 3 cycles, (4 when true)
  us <<= 1; //x2 us, = 2 cycles
  us -= 4; // = 2 cycles
#else
  if (us <= 16) return; //= 3 cycles, (4 when true)
  if (us <= 25) return; //= 3 cycles, (4 when true), (must be at least 25 if we want to substract 22) us -= 22; // = 2 cycles us >>= 2; // us div 4, = 4 cycles
#endif
  __asm__ __volatile__ (
    "1: sbiw %0,1" "\n\t" // 2 cycles
    "brne 1b" : "=w" (us) : "0" (us) // 2 cycles
  );
}