// // положи датчик горизонтально, надписями вверх
// // ДАЖЕ НЕ ДЫШИ НА НЕГО
// // отправь любой символ в сериал, чтобы начать калибровку
// // жди результатов

// // --------------------- НАСТРОЙКИ ----------------------
// const int buffersize = 70;     // количество итераций калибровки
// const int acel_deadzone = 10;  // точность калибровки акселерометра (по умолчанию 8)
// const int gyro_deadzone = 6;   // точность калибровки гироскопа (по умолчанию 2)
// // --------------------- НАСТРОЙКИ ----------------------

// #include "I2Cdev.h"
// #include "MPU6050.h"
// #include "Wire.h"
// MPU6050 mpu(0x68);
// int16_t ax, ay, az, gx, gy, gz;
// int mean_ax, mean_ay, mean_az, mean_gx, mean_gy, mean_gz, state = 0;
// int ax_offset, ay_offset, az_offset, gx_offset, gy_offset, gz_offset;

// ///////////////////////////////////   SETUP   ////////////////////////////////////
// void setup() {
//   Wire.begin();
//   Serial.begin(9600);
//   mpu.initialize();
//   // ждём очистки сериал
//   while (Serial.available() && Serial.read()); // чистим
//   while (!Serial.available()) {
//     Serial.println(F("Send any character to start sketch.\n"));
//     delay(1500);
//   }
//   while (Serial.available() && Serial.read()); // чистим ещё на всякий
//   Serial.println("\nMPU6050 Calibration Sketch");
//   delay(2000);
//   Serial.println("\nYour MPU6050 should be placed in horizontal position, with package letters facing up");
//   delay(3000);

//   // проверка соединения
//   Serial.println(mpu.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");
//   delay(1000);

//   // сбросить оффсеты
//   mpu.setXAccelOffset(0);
//   mpu.setYAccelOffset(0);
//   mpu.setZAccelOffset(0);
//   mpu.setXGyroOffset(0);
//   mpu.setYGyroOffset(0);
//   mpu.setZGyroOffset(0);
// }

// ///////////////////////////////////   LOOP   ////////////////////////////////////
// void loop() {
//   if (state == 0) {
//     Serial.println("\nReading sensors for first time...");
//     meansensors();
//     state++;
//     delay(1000);
//   }
//   if (state == 1) {
//     Serial.println("\nCalculating offsets...");
//     calibration();
//     state++;
//     delay(1000);
//   }
//   if (state == 2) {
//     meansensors();
//     Serial.println("\nFINISHED!");
//     Serial.print("\nSensor readings with offsets:\t");
//     Serial.print(mean_ax);
//     Serial.print("\t");
//     Serial.print(mean_ay);
//     Serial.print("\t");
//     Serial.print(mean_az);
//     Serial.print("\t");
//     Serial.print(mean_gx);
//     Serial.print("\t");
//     Serial.print(mean_gy);
//     Serial.print("\t");
//     Serial.println(mean_gz);
//     Serial.print("Your offsets:\t");
//     Serial.print(ax_offset);
//     Serial.print(", ");
//     Serial.print(ay_offset);
//     Serial.print(", ");
//     Serial.print(az_offset);
//     Serial.print(", ");
//     Serial.print(gx_offset);
//     Serial.print(", ");
//     Serial.print(gy_offset);
//     Serial.print(", ");
//     Serial.println(gz_offset);
//     Serial.println("\nData is printed as: acelX acelY acelZ giroX giroY giroZ");
//     Serial.println("Check that your sensor readings are close to 0 0 16384 0 0 0");
//     Serial.println("If calibration was succesful write down your offsets so you can set them in your projects using something similar to mpu.setXAccelOffset(youroffset)");
//     while (1);
//   }
// }
// ///////////////////////////////////   FUNCTIONS   ////////////////////////////////////
// void meansensors() {
//   long i = 0, buff_ax = 0, buff_ay = 0, buff_az = 0, buff_gx = 0, buff_gy = 0, buff_gz = 0;
//   while (i < (buffersize + 101)) { // read raw accel/gyro measurements from device
//     mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
//     if (i > 100 && i <= (buffersize + 100)) { //First 100 measures are discarded
//       buff_ax = buff_ax + ax;
//       buff_ay = buff_ay + ay;
//       buff_az = buff_az + az;
//       buff_gx = buff_gx + gx;
//       buff_gy = buff_gy + gy;
//       buff_gz = buff_gz + gz;
//     }
//     if (i == (buffersize + 100)) {
//       mean_ax = buff_ax / buffersize;
//       mean_ay = buff_ay / buffersize;
//       mean_az = buff_az / buffersize;
//       mean_gx = buff_gx / buffersize;
//       mean_gy = buff_gy / buffersize;
//       mean_gz = buff_gz / buffersize;
//     }
//     i++;
//     delay(2);
//   }
// }

// void calibration() {
//   ax_offset = -mean_ax / 8;
//   ay_offset = -mean_ay / 8;
//   az_offset = (16384 - mean_az) / 8;
//   gx_offset = -mean_gx / 4;
//   gy_offset = -mean_gy / 4;
//   gz_offset = -mean_gz / 4;

//   while (1) {
//     int ready = 0;
//     mpu.setXAccelOffset(ax_offset);
//     mpu.setYAccelOffset(ay_offset);
//     mpu.setZAccelOffset(az_offset);
//     mpu.setXGyroOffset(gx_offset);
//     mpu.setYGyroOffset(gy_offset);
//     mpu.setZGyroOffset(gz_offset);
//     meansensors();
//     Serial.println("...");

//     if (abs(mean_ax) <= acel_deadzone) ready++;
//     else ax_offset = ax_offset - mean_ax / acel_deadzone;
//     if (abs(mean_ay) <= acel_deadzone) ready++;
//     else ay_offset = ay_offset - mean_ay / acel_deadzone;
//     if (abs(16384 - mean_az) <= acel_deadzone) ready++;
//     else az_offset = az_offset + (16384 - mean_az) / acel_deadzone;
//     if (abs(mean_gx) <= gyro_deadzone) ready++;
//     else gx_offset = gx_offset - mean_gx / (gyro_deadzone + 1);
//     if (abs(mean_gy) <= gyro_deadzone) ready++;
//     else gy_offset = gy_offset - mean_gy / (gyro_deadzone + 1);
//     if (abs(mean_gz) <= gyro_deadzone) ready++;
//     else gz_offset = gz_offset - mean_gz / (gyro_deadzone + 1);
//     if (ready == 6) break;
//   }
// }