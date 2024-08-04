
#define TEST 108

#ifdef DEBUG_ENABLE
#define DEBUG(x) Serial.println(x)
#else
#define DEBUG(x)
#endif

#define FOR_i(from, to) for(int i = (from); i < (to); i++)
// FOR_i(0, 10) {
//   Serial.println(i);
// }
