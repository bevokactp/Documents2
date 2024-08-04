
const GOSPODA = {
  1: 25,
  2: 40,
  3: 51,
  4: 76,
  5: 84,
  6: 93,
};

const maskNumberWeekdaysCircle1 = [
  1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 11,
  11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 16, 16, 17, 17, 17, 18, 18,
  19, 19, 19, 20, 20, 21, 21, 21, 22, 22, 23, 23, 23, 24, 24, 1,
];
const maskNumberWeekdaysCircle2 = Array.from(
  { length: 24 },
  (_, i) => i + 1
).flatMap((num) => Array(num % 2 === 0 ? 2 : 3).fill(num));

export const getTime = (start_datetime) => {
  const now = new Date();

  if (!start_datetime) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const startDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    start_datetime.hours,
    start_datetime.minutes,
    start_datetime.seconds
  );

  let timeDiff = now - startDay;
  if (timeDiff < 0) {
    const startPreviousDay = new Date(startDay.getTime() - 24 * 60 * 60 * 1000);
    timeDiff = now - startPreviousDay;
  }

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return {
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};

export const getYearfromGregorian = (
  dateTimeGregorian,
  dateTimeGregorianYear,
  dateTimeNovoLeto
) => {
  const year = dateTimeGregorianYear + dateTimeNovoLeto.getFullYear();

  var dateTimeNovoLetoYear = new Date(
    dateTimeGregorian.getFullYear(),
    dateTimeNovoLeto.getMonth(),
    dateTimeNovoLeto.getDate(),
    dateTimeNovoLeto.getHours(),
    dateTimeNovoLeto.getMinutes(),
    dateTimeNovoLeto.getSeconds()
  );
  const isAfterNovoLeto = dateTimeGregorian > dateTimeNovoLetoYear;
  return year + (isAfterNovoLeto ? 1 : 0);
};

export const getNumberYear = (year) => {
  return ((year - 1) % 24) + 1;
};

export const determineCircleNumberYear = (number_year) => {
  return 1 <= number_year && number_year <= 12 ? 1 : 2;
};

export const determineNumberDayYearDay = (
  dateTimeGregorian,
  dateTimeNovoLeto
) => {
  var dateTimeNovoLetoYear = new Date(
    dateTimeGregorian.getFullYear(),
    dateTimeNovoLeto.getMonth(),
    dateTimeNovoLeto.getDate(),
    dateTimeNovoLeto.getHours(),
    dateTimeNovoLeto.getMinutes(),
    dateTimeNovoLeto.getSeconds()
  );

  if (dateTimeNovoLetoYear > dateTimeGregorian) {
    dateTimeNovoLetoYear = new Date(
      dateTimeGregorian.getFullYear() - 1,
      dateTimeNovoLeto.getMonth(),
      dateTimeNovoLeto.getDate(),
      dateTimeNovoLeto.getHours(),
      dateTimeNovoLeto.getMinutes(),
      dateTimeNovoLeto.getSeconds()
    );
  }
  return (
    Math.floor(
      (dateTimeGregorian - dateTimeNovoLetoYear) / (1000 * 60 * 60 * 24)
    ) + 1
  );
};

export const determineNumberSeasonYear = (numberDayYear) => {
  if (numberDayYear <= 90) return 1;
  if (numberDayYear <= 180) return 2;
  if (numberDayYear <= 270) return 3;
  return 4;
};

export const determineNumberMonthYear = (numberDayYear) => {
  if (numberDayYear <= 360) return Math.ceil(numberDayYear / 30);
  return 13; // 13th month for the remaining 5/6 days
};

export const determineNumberWeekdayYear = (numberDayYear, numberMonthYear) => {
  if (numberMonthYear === 13) return 61;
  return (numberDayYear % 6) + 1; // 6 days per week
};

export const determineNumberDaySeason = (
  numberDayYear,
  numberMonthYear,
  numberDayMonth
) => {
  if (numberMonthYear === 13) return 90 + numberDayMonth;
  return ((numberDayYear - 1) % 90) + 1;
};

export const determineNumberDayMonth = (numberDayYear) => {
  return ((numberDayYear - 1) % 30) + 1;
};

export const determineNumberDayWeekday = (numberDayYear) => {
  return ((numberDayYear - 1) % 6) + 1;
};

export const determineNumberGodWeekday = (
  numberWeekdayYear,
  circleNumberYear,
  numberDayWeekday
) => {
  if (numberWeekdayYear === 61) {
    return GOSPODA[numberDayWeekday];
  }

  if (circleNumberYear === 1)
    return maskNumberWeekdaysCircle1[numberWeekdayYear - 1];
  return maskNumberWeekdaysCircle2[numberWeekdayYear - 1];
};

export const determineNumberHour = (Time) => {
  return Time.hours + 1;
};

export const determineNumber5Minute = (Time) => {
  return Math.floor(Time.minutes / 5) + 1;
};

export const determineNumberMinute = (Time) => {
  return Time.minutes + 1;
};

export const calculateDateTimeAttributes = (input, startDateTimeKolodar) => {
  if (!startDateTimeKolodar) return null;

  const dateTimeGregorian = new Date(
    input.year,
    input.month - 1,
    input.day,
    input.hours,
    input.minutes,
    0
  );
  const dateTimeNovoLeto = new Date(
    startDateTimeKolodar.year,
    startDateTimeKolodar.month - 1,
    startDateTimeKolodar.day,
    startDateTimeKolodar.hours,
    startDateTimeKolodar.minutes,
    startDateTimeKolodar.seconds
  );

  const year = getYearfromGregorian(
    dateTimeGregorian,
    input.year,
    dateTimeNovoLeto
  );
  const numberYear = getNumberYear(year);
  const circleNumberYear = determineCircleNumberYear(numberYear);
  const numberDayYear = determineNumberDayYearDay(
    dateTimeGregorian,
    dateTimeNovoLeto
  );
  const numberSeasonYear = determineNumberSeasonYear(numberDayYear);
  const numberMonthYear = determineNumberMonthYear(numberDayYear);
  const numberWeekdayYear = determineNumberWeekdayYear(
    numberDayYear,
    numberMonthYear
  );
  const numberDayMonth = determineNumberDayMonth(numberDayYear);
  const numberDaySeason = determineNumberDaySeason(
    numberDayYear,
    numberMonthYear,
    numberDayMonth
  );
  const numberDayWeekday = determineNumberDayWeekday(numberDayYear);
  const numberGodWeekday = determineNumberGodWeekday(
    numberWeekdayYear,
    circleNumberYear,
    numberDayWeekday
  );
  const time = getTime(startDateTimeKolodar);
  const numberHour = determineNumberHour(time);
  const number5Minute = determineNumber5Minute(time);
  const numberMinute = determineNumberMinute(time);

  return {
    year,
    numberYear,
    circleNumberYear,
    numberDayYear,
    numberSeasonYear,
    numberMonthYear,
    numberWeekdayYear,
    numberDaySeason,
    numberDayMonth,
    numberDayWeekday,
    numberGodWeekday,
    numberHour,
    number5Minute,
    numberMinute,
  };
};
