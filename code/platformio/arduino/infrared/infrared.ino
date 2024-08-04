
// board: es8266
// plate: LOLIN WEMOS D1 R2

#define LED_BUILTIN D4
#define LED_PIN D5
#define IR_PIN D7

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
  pinMode(LED_PIN, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
  pinMode(IR_PIN, INPUT);
}

int val;
void loop() {
  val = digitalRead(IR_PIN);
  Serial.println(val);
  if (val) {
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(LED_BUILTIN, LOW);   // Turn the LED on (Note that LOW is the voltage level
  }
  else {
    digitalWrite(LED_PIN, LOW);
    digitalWrite(LED_BUILTIN, HIGH);  // Turn the LED off by making the voltage HIGH
  }
  delay(10);
}

