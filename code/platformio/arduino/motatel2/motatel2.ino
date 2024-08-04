
// во избежание проблем с переменными, все глобальные переменные лучше объявлять в самой первой вкладке
// в главном файле скетча располагаем все настройки, подключаем библиотеки, объявляем глобальные переменные. здесь же оставляем блоки setup() и loop()
// остальной код пакуем в функции (урок по функциям) и располагаем в остальных вкладках, группируя по смыслу
// without for

// включить режим отладки
#define DEBUG_ENABLE 1

#ifdef DEBUG_ENABLE
#define DEBUG(x) Serial.println(x)
#else
#define DEBUG(x)
#endif


// #include <GyverOLED.h>

#define COLOR_RED_PIN 8
#define COLOR_GREEN_PIN 7
#define COLOR_BLUE_PIN 9

#define MOTORS_PIN 3
#define ACTUATOR_PIN1 18
#define ACTUATOR_PIN2 19

#define BUTTON_PIN 5

#define BUTTON_DEBOUNCE_TIME 100
#define BLINK_TIME 1000
// #define TIME_DISPLAY_UPDATE 1000
// #define TIME_WINDING_FOR_DISPLAY 99

// время задержки на возврат штока в начальную позицию если на время запуска он был выдвинут
#define TIME_BACK_SHTOK 10000
// время на изначального выдвижения штока
#define TIME_BEGIN_STEP_SHTOK 3500


// int total_time_winding = TIME_WINDING_FOR_DISPLAY;
bool flag = false;
uint32_t btnTimer = 0, timerDisplayUpdate = 0;

// GyverOLED<SSD1306_128x64, OLED_NO_BUFFER> oled;

void setup() {

#ifdef DEBUG_ENABLE
  Serial.begin(9600);
#endif

  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(MOTORS_PIN , OUTPUT);

  pinMode(ACTUATOR_PIN1, OUTPUT);
  pinMode(ACTUATOR_PIN2, OUTPUT);

  pinMode(COLOR_RED_PIN, OUTPUT);
  pinMode(COLOR_GREEN_PIN, OUTPUT);
  pinMode(COLOR_BLUE_PIN, OUTPUT);
  
  // oled.init(); 
  // oled.setScale(4);

  turn_light('*');
  turn_light('r');
  
  // откат если выдвинут
  back_actuator();
  delay(3000);

  // start_winding();

}

void loop() {

  turn_light('g');

  button_is_click_with_debounce();

  // if (millis() - timerDisplayUpdate >= TIME_DISPLAY_UPDATE) {
  //   display_timer_update();
  //   timerDisplayUpdate = millis(); 
  // }
}

void button_is_click_with_debounce() {
  bool btnState = !digitalRead(BUTTON_PIN);
  if (btnState && !flag && millis() - btnTimer > BUTTON_DEBOUNCE_TIME) {
    flag = true;
    btnTimer = millis();
    DEBUG(F("press"));
    start_winding();
  }
  if (!btnState && flag && millis() - btnTimer > BUTTON_DEBOUNCE_TIME) {
    flag = false;
    btnTimer = millis();
    DEBUG(F("release"));
    
  }
}

void start_winding() {
    
    // время начального шага намотки 

    blink_two_color('g', 'b');
    
    uint32_t time_step = 3400;
    
    run_motors();
    forward_actuator();

    // первое выдвижение штока с включеными двигателями
    delay(TIME_BEGIN_STEP_SHTOK);
    
    // постепенное уменьшение шага намотки
    
    for (int i = 0; i <= 20; i++) {

      // Serial.print(counter++);Serial.print(" ");
      DEBUG(time_step);
      back_actuator();
      delay(time_step);
      forward_actuator();

      // запас на переключение актуатора
      delay(time_step - 35); 
      time_step -= 35;
    }

    stop_motors();
    back_actuator();
    blink_two_color('b', 'g');
}

void run_motors() {
  analogWrite(MOTORS_PIN , 255);  // включить на 100%
}

void stop_motors() {
  analogWrite(MOTORS_PIN , LOW);  // выключить полностью
}

void forward_actuator() {
  digitalWrite(ACTUATOR_PIN1, LOW);
  digitalWrite(ACTUATOR_PIN2, HIGH);
}

void back_actuator() {
  digitalWrite(ACTUATOR_PIN1, HIGH);
  digitalWrite(ACTUATOR_PIN2, LOW);
}
 
void turn_light(char color_code) {
  switch (color_code) {
    case 'r':
      digitalWrite(COLOR_RED_PIN, 0);
      digitalWrite(COLOR_GREEN_PIN, 1);
      digitalWrite(COLOR_BLUE_PIN, 1);
      break;
    case 'g':
      digitalWrite(COLOR_RED_PIN, 1);
      digitalWrite(COLOR_GREEN_PIN, 0);
      digitalWrite(COLOR_BLUE_PIN, 1);
      break;
    case 'b':
      digitalWrite(COLOR_RED_PIN, 1);
      digitalWrite(COLOR_GREEN_PIN, 1);
      digitalWrite(COLOR_BLUE_PIN, 0);
      break;
    //  no color
    case '*':
      digitalWrite(COLOR_RED_PIN, 1);
      digitalWrite(COLOR_GREEN_PIN, 1);
      digitalWrite(COLOR_BLUE_PIN, 1);
      break;
  }
}

void blink_two_color(char color_code1, char color_code2) {
  int counter = 4;
  bool flag = true;
  while (counter) {
    turn_light((flag) ? color_code1 : color_code2);
    flag = !flag;
    counter--; 
    delay(BLINK_TIME);
  }
}

void display_timer_update() {
  // oled.clear();
  // oled.setCursor(45, 3);
  // oled.print(total_time_winding--);
  // if (!total_time_winding) total_time_winding = TIME_WINDING;
}
