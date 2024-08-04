#include "Arduino.h"

// Ограничить диапазон числа value до min и max
int constrain(value,min,max) {
  if (value < min)
    return min;
  else if (value > max)
    return max;
  return value;
}	

// 	Перевести диапазон числа value от (fromMin, fromMax) в (toMin, toMax)	Перевести диапазон числа value от (fromMin, fromMax) в (toMin, toMax)
int map(val, fromMin, fromMax, toMin, toMax) {
  return (val - fromMin) * (fromMax - fromMin) / (toMax - toMin) + toMin;
}
