
#include <Arduino.h>

// пример чтения установленных фьюз-байтов 
#define LOW_FUSE       (0x0000)
#define LOCK           (0x0001)
#define EXTENDED_FUSE  (0x0002)
#define HIGH_FUSE      (0x0003)

/*
void setup() {
  Serial.begin(9600);
  
  Serial.print("Low:  0x");
  Serial.println(fuse_get(LOW_FUSE_BYTE), HEX);
  
  Serial.print("High: 0x");
  Serial.println(fuse_get(HIGH_FUSE_BYTE), HEX);
  
  Serial.print("Extended:  0x");
  Serial.println(fuse_get(EXTENDED_FUSE_BYTE), HEX);
  
  Serial.print("Lock: 0x");
  Serial.println(fuse_get(LOCK_BYTE), HEX);
  
}
*/

uint8_t fuse_get(uint16_t address) {
  uint8_t data;
  asm volatile
  (
    "sts %[spmreg], %[spmcfg]   \n\t"
    "lpm %[data], Z             \n\t"
    : [data] "=r" (data)
    : [spmreg]"i" (_SFR_MEM_ADDR(SPMCSR)),
    [spmcfg] "r" ((1 << SPMEN) |(1 << BLBSET)),
    "z" (address)
  );
  return data;
}