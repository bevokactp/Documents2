
#include <Arduino.h>

// конвертация цвета R5G5B5 в R8G8B8
// R8 = (R5 << 3) | (R5 >> 2);
// G8 = (R5 << 3) | (R5 >> 2);
// B8 = (R5 << 3) | (R5 >> 2);

// функция переводит цвет из HSV в RGB (опционально сразу запускает ШИМ)
void HSVtoRGB(uint8_t h, uint8_t s, uint8_t v) {
  float r, g, b;
  
  float H = (float)h / 255;
  float S = (float)s / 255;
  float V = (float)v / 255;
  
  int i = int(H * 6);
  float f = H * 6 - i;
  float p = V * (1 - S);
  float q = V * (1 - f * S);
  float t = V * (1 - (1 - f) * S);

  switch(i % 6){
  case 0: r = V, g = t, b = p; break;
  case 1: r = q, g = V, b = p; break;
  case 2: r = p, g = V, b = t; break;
  case 3: r = p, g = q, b = V; break;
  case 4: r = t, g = p, b = V; break;
  case 5: r = V, g = p, b = q; break;
  }

  // финальные значения для R G B 8 бит
  byte R = r * 255;
  byte G = g * 255;
  byte B = b * 255;
  
  // тут можно отправлять на ШИМ
  analogWrite(3, R);
  analogWrite(5, G);
  analogWrite(6, B);
}
