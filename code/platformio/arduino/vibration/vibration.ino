
#define DEBUG Serial.println

#define VIBR_PIN 6
#define LED_PIN 10

void setup() {
  Serial.begin(9600);

  pinMode(VIBR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  if (digitalRead(VIBR_PIN)) 
    {
      digitalWrite(LED_PIN, HIGH);
      delay(1000);
      digitalWrite(LED_PIN, LOW);
    }
  delay(10);
}
