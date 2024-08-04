
#pragma once

#include "Arduino.h"

#define LIBRARY_VERSION "1.000"

#define MAKE_STR(x) #x
#define CONCAT(x,y) x##y


namespace libr {
  char* getVersion();
};

char* libr::getVersion();

class button {
  public:
    button (byte pin) {
      _pin = pin;
      pinMode(_pin, INPUT_PULLUP);
    }
    bool click() {
      bool btnState = digitalRead(_pin);
      if (!btnState && !_flag && millis() - _tmr >= 100) {
        _flag = true;
        _tmr = millis();
        return true;
      }
      if (!btnState && _flag && millis() - _tmr >= 500) {
        _tmr = millis ();
        return true;
      }
      if (btnState && _flag) {
        _flag = false;
        _tmr = millis();
      }
      return false;
    }
  private:
    byte _pin;
    uint32_t _tmr;
    bool _flag;
};
