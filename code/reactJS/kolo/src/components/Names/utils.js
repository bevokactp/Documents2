
import { EPOCHA_NUMBER, MONTHS_MASK_GROGORIAN_TO_1JULY } from "./constants";


const getNumberYearFromGregorianToReal1July = (year) => {
  const index = (year - 1986) % 24 + 1;
  return index >= 0 ? index : index + 24;
}


const getNumberMonthFromGregorianToReal1July = (year_number, month_number, day_number) => {
  if (day_number < 1 || day_number > 31) {
    return "Ошибка: Некорректный номер дня";
  }

  if (day_number <= 12) {
    return MONTHS_MASK_GROGORIAN_TO_1JULY[month_number][0];
  } else if (day_number <= 24) {
    return MONTHS_MASK_GROGORIAN_TO_1JULY[month_number][1];
  } else {
    if (year_number <= 12)
      return MONTHS_MASK_GROGORIAN_TO_1JULY[month_number][0];
    return MONTHS_MASK_GROGORIAN_TO_1JULY[month_number][1];
  }
}

  // (1842, 7, 1) === "1:1"
  // (1883, 9, 1) === "3:18"
  // (1962, 7, 1) === "1:1"
  // (2010, 7, 1) === "1:1"
  // (1893, 11, 9) === "5:4"
  // (1928, 5, 25) === "23:15"
  // (1968, 3, 30) === "9:7"
  // (1968, 2, 5) === "8:7"
  // (1975, 3, 30) === "21:14"
  // (1993, 4, 21) === "22:8"
  // (1995, 12, 28) === "6:10"
  // (2045, 8, 29) === "2:12"
  // (2053, 10, 17) === "16:20"
export const calculatePresentNameByGrogorian1July = (year, month_number, day_number) => {
    const year_number = getNumberYearFromGregorianToReal1July(year);
    const number_month = getNumberMonthFromGregorianToReal1July(year_number, month_number, day_number);
    return `${number_month}o${year_number}`;
  };

export const calculatePosthumousName = (death) => {
    return `${death.numberMonthYear}+${death.numberDayMonth}`;
  };

export const calculateSelfNamedName = (result) => {
    return `${result}`;
  };

export const calculateEticdName = (result) => {
    return `${result}`;
  };

export const calculateLanguageName = (birthSelf) => {
    return `${EPOCHA_NUMBER}э${birthSelf.year}`;
  };
