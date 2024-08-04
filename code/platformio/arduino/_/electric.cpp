
#include <array>
#include <cstdint>
#include <cstdio>

#include <numeric>
#include <map>
#include <iomanip>
#include <iostream>
using namespace std;

// determinate i w of power supply for led strip
uint8_t *
determinate_power_supply_for_strip_led(v_led, w_led, length_led) {
	uint8_t w_ps = (uint8_t) (w_led * length_led * 1.3);
	return {w_ps / v_led, w_ps};
}

// расчёт цепи постоянного тока
std::array<float, 4>
calculation_i_v_r_p_electrical_network(float i = 0, float v = 0, float r = 0){
	float p;
	if (i == 0) {
		i = v / r;
		p = i * i * r;
	} else if (v = 0) {
		v = i * r;
		p = i * i * r;
	} else if (r = 0) {
		r = v / i;
		p = i * i * r;
	} else {
		p = i * i * r;
	}
	return {
		i,
		v,
		r,
		p,
    };
}

// расчёт колебательного контура lc
// r удельное сопротивление материала
// l длина
// S  площадь сечения
uint8_t 
calculation_kolebatel_kohtyp_lc(uint8_t r = 0, uint8_t l = 0, uint8_t s = 0){
	  return r * l / s;
	}

// расчёт сопротивления и мощности резистора для светодиода
std::array<float, 3>
calculation_v_r_p_resistor_for_led(const char diametp_led, const char color_led, const char v_power){
	  // Vcc напряжение питания, 
  // Vdo  напряжение падения (зависит от светодиода)
  // I ток светодиода обычно 20 мА = 0.02 а
  float v_led, i_led;

  if (diametp_led == 3 or diametp_led == 5) {
	    i_led = 0.02;
  } else 
    return {0, 0};
  
    switch (color_led) {
	    case 'k':
      v_led = 1.8;
      break;
    case 'w':
      v_led = 2.1;
      break;
    case '3':
      v_led = 2.2;
      break;
    case 'c':
      v_led = 3.2;
      break;
    case '6':
      v_led = 3.2;
      break;
    default:
      v_led = 1.8;
      break;
  }

  float v_resistor = (float)v_power - v_led;
  float r_resistor = v_resistor / i_led;
  float p_resistor = i_led * i_led * r_resistor;
  return {v_resistor, r_resistor, p_resistor};
}



struct VRP_struct {
	uint8_t i;
	float r;
	float p;
};
// расчёт v r паралельно для резисторов
// уменьшить сопротивление  
VRP_struct 
// расчёт v r последовательно для резисторов 
// увеличить сопротивление 
calculation_v_r_resistors_serial(uint8_t* vv, uint8_t* rr, float* pp, uint8_t count){
	uint8_t v = 0, r = 0;
  for (int j = 0; j < count; ++j)
  {
    v += vv[j];
    r += rr[j];
    p += pp[j];
  }
	VRP_struct vrp_struct;
	vrp_struct.i = i;
	vrp_struct.r = 1/r;
	vrp_struct.p = p;
	return vrp_struct;
}

struct IRP_struct {
	uint8_t i;
	float r;
	float p;
};
// расчёт v r паралельно для резисторов
// увеличить сопротивление  
IRP_struct 
calculation_r_resistors_parallel(uint8_t* ii, uint8_t* rr, float* pp, uint8_t count){
	uint8_t i = 0;
	float r = 0;
	float p = 0;
	for (int j = 0; j < count; ++j) {
	    i += ii[j];
	    p += pp[j];
		r += 1.0/rr[j];
	}
	IRP_struct ir_struct;
	ir_struct.i = i;
	ir_struct.r = 1/r;
	ir_struct.p = p;
	return ir_struct;
}

// делитель напряжения резисторов
float
divide_v_with_2_resistors(uint16_t v, uint16_t r1, uint16_t r2){
	return (float)(v * r2) / (r1 + r2);
}

// делитель напряжения ёмкости
float
divide_v_with_2_capacitors(uint16_t v, uint16_t r1, uint16_t r2){
	return (float)(v * r2) / (r1 + r2);
}

// паралельно конденсаторы
uint16_t
get_capacity_parallely_capacitors(uint16_t* c, uint8_t count){
	uint16_t sum = 0;
	sum = std::accumulate(c, c+count, sum);
	return sum;
}

// последовательно конденсаторы
float
get_capacity_serially_capacitors(uint16_t* c, uint8_t count){
	float sum = 0;
	for (int i = 0; i < count; ++i)
		sum += 1.0/c[i];
	return 1/sum;
}
