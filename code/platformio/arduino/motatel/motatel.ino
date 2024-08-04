
// включить режим отладки
#define DEBUG_ENABLE 1

#ifdef DEBUG_ENABLE
#define DEBUG(x) Serial.println(x)
#else
#define DEBUG(x)
#endif

// присвоение пинов двигателей на плате
#define PIN_AKTUATOP 7
#define PIN_MOTOP 10

// двигателя управляются через 0
#define START_FORWARD 0
#define STOP_BACK 1

// время задержки на возврат штока в начальную позицию если на время запуска он был выдвинут
#define TIME_BACK_SHTOK 10000

// время на изначального выдвижения штока
#define TIME_BEGIN_STEP 3500

// присвоение пинов rgb led
#define RED_PIN 3
#define GREEN_PIN 5
#define BLUE_PIN 6

// кнопка запуска намотки 
#define BUTTON_PIN 12
#define DEBOUNCE 100  // таймаут антидребезга, миллисекунды


void setup() {  

#ifdef DEBUG_ENABLE
    Serial.begin(9600);
#endif

    pinMode(RED_PIN, OUTPUT);
    pinMode(GREEN_PIN, OUTPUT);
    pinMode(BLUE_PIN, OUTPUT);

    pinMode (PIN_AKTUATOP, OUTPUT);
    pinMode (PIN_MOTOP, OUTPUT);

    // загрузка платы с включение красного цвета на rgb светодиоде
    digitalWrite(RED_PIN, HIGH);
    delay(2000);

    // после того как загрузка платы завершена включить зелённый цвет на rgb светодиоде
    digitalWrite(RED_PIN, LOW);
    digitalWrite(GREEN_PIN, HIGH);

    // откат актуатора и остановка мотора если был включёнъ
    digitalWrite (PIN_MOTOP, STOP_BACK);
    digitalWrite (PIN_AKTUATOP, STOP_BACK);

    // назначение кнопки с подтягивающим резистором
    pinMode(BUTTON_PIN, INPUT_PULLUP);
}


bool btnState, start_btn_clicked;
uint32_t debounceTimer;
void loop() {

  // чтение состояния кнопки с защитой от дребезга
  btnState = !digitalRead(BUTTON_PIN);  // читаем состояние кнопки с инверсией. 1 - нажата, 0 - нет

  // если нажата и была отпущена (start_btn_clicked 0) и прошло не менее DEBOUNCE времени
  if (btnState && !start_btn_clicked && (millis() - debounceTimer > DEBOUNCE)) {
    DEBUG("press1");
    start_btn_clicked = true;              // запомнили что нажата
    debounceTimer = millis();    // запомнили время нажатия
    start_winding();
  }
  if (!btnState && start_btn_clicked) {    // если отпущена и была нажата (start_btn_clicked 1)
    start_btn_clicked = false;             // запомнили что отпущена
    debounceTimer = millis();    // запомнили время отпускания
    DEBUG("release");
  }
}

void start_winding() {

    // время начального шага намотки 
    unsigned int time_step = 3500;

    // мигание rgb led зелёным цветом как предупреждение о готовности к запуску
    digitalWrite(GREEN_PIN, LOW);
    delay(1000);
    digitalWrite(GREEN_PIN, HIGH);
    delay(1000);
    digitalWrite(GREEN_PIN, LOW);
    delay(1000);
    digitalWrite(GREEN_PIN, HIGH);
    delay(1000);
    digitalWrite(GREEN_PIN, LOW);

    // запуск намотки зажигает синим светом на rgb led 
    digitalWrite(BLUE_PIN, HIGH);

    // запуск двигателей
    digitalWrite (PIN_AKTUATOP, START_FORWARD);
    digitalWrite (PIN_MOTOP, START_FORWARD);

    // первое выдвижение штока с включеными двигателями
    delay(TIME_BEGIN_STEP);

    // постепенное уменьшение шага намотки
    for (byte i = 0; i <= 12; i++) {
      digitalWrite (PIN_AKTUATOP, STOP_BACK);
      delay(time_step);
      digitalWrite (PIN_AKTUATOP, START_FORWARD);
      delay(time_step - 50);
      time_step -= 35;
    }

    // остановка двигателей и возврат штока изначально с выключением актуатора
    digitalWrite (PIN_MOTOP, STOP_BACK);
    digitalWrite (PIN_AKTUATOP, STOP_BACK);

    // мигание синим светом на rgb led по окончанию намотки
    delay(1000);
    digitalWrite(BLUE_PIN, LOW);
    delay(1000);
    digitalWrite(BLUE_PIN, HIGH);
    delay(1000);
    digitalWrite(BLUE_PIN, LOW);
    delay(1000);
    digitalWrite(BLUE_PIN, HIGH);
    delay(1000);
    digitalWrite(BLUE_PIN, LOW);

    // по полном завершении намотки зажечь зелённый свет на rgb led
    digitalWrite(GREEN_PIN, HIGH);
}
