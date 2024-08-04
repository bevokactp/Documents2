
#define DEBUG 1

#ifdef DEBUG
#define DEBUG Serial.println
#else
#define DEBUG
#endif

#define PHOTORESIST_PIN 5
#define LED_PIN 0


void setup() {
#ifdef DEBUG
  Serial.begin(9600);   // открыть порт для связи
#endif
  pinMode(PHOTORESIST_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  if (analogRead(PHOTORESIST_PIN) < 400) {
    digitalWrite(LED_PIN, LOW);
  } else 
    digitalWrite(LED_PIN, HIGH);
  delay(50);                      // ждём
  DEBUG(analogRead(PHOTORESIST_PIN));  // читаем и выводим
}