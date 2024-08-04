
import React, { useState, useEffect } from 'react';

import { calculateDateTimeAttributes } from './convert_utils';
import useStartDateTime from './useStartDateTime';


export default function DatetimeReal () {

  const [Time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [Year, setYear] = useState(null);
  const [numberYear, setNumberYear] = useState(null);
  const [circleNumberYear, setCircleNumberYear] = useState(null);
  const [numberSeasonYear, setNumberSeasonYear] = useState(null);
  const [numberMonthYear, setNumberMonthYear] = useState(null);
  const [numberWeekdayYear, setNumberWeekDay] = useState(null);
  const [numberDayYear, setNumberDayYear] = useState(null);
  const [numberDaySeason, setNumberDaySeason] = useState(null);
  const [numberDayMonth, setNumberDayMonth] = useState(null);
  const [numberDayWeekday, setNumberDayWeekday] = useState(null);
  const [numberGodWeekday, setnumberGodWeekday] = useState(null);
  const [numberHour, setNumberHour] = useState(null);
  const [number5Minute, setNumber5Minute] = useState(null);
  const [numberMinute, setNumberMinute] = useState(null);

  const startDateTimeKolodar = useStartDateTime();

  useEffect(() => {
    if (startDateTimeKolodar) {
      const updateTime = () => {
        const dateTimeGregorianNow = new Date();
        const result = calculateDateTimeAttributes({
          year: dateTimeGregorianNow.getFullYear(),
          month: dateTimeGregorianNow.getMonth() + 1,
          day: dateTimeGregorianNow.getDate(),
          hours: dateTimeGregorianNow.getHours(),
          minutes: dateTimeGregorianNow.getMinutes()
        }, startDateTimeKolodar);

        if (result) {
          setYear(result.year);
          setNumberYear(result.numberYear);
          setCircleNumberYear(result.circleNumberYear);
          setNumberSeasonYear(result.numberSeasonYear);
          setNumberMonthYear(result.numberMonthYear);
          setNumberWeekDay(result.numberWeekdayYear);
          setNumberDayYear(result.numberDayYear);
          setNumberDaySeason(result.numberDaySeason);
          setNumberDayMonth(result.numberDayMonth);
          setNumberDayWeekday(result.numberDayWeekday);
          setnumberGodWeekday(result.numberGodWeekday);
          setTime({ hours: dateTimeGregorianNow.getHours(), minutes: dateTimeGregorianNow.getMinutes(), seconds: dateTimeGregorianNow.getSeconds() });
          setNumberHour(result.numberHour);
          setNumber5Minute(result.number5Minute);
          setNumberMinute(result.numberMinute);
        }
      };
      updateTime();

      const intervalId = setInterval(updateTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startDateTimeKolodar]);

  return (
      <div>
        <h3>dateTime Real</h3>
        <p>Start dateTime real { startDateTimeKolodar ?
          `${String(startDateTimeKolodar.hours).padStart(2, '0')}:${String(startDateTimeKolodar.minutes).padStart(2, '0')}:${String(startDateTimeKolodar.seconds).padStart(2, '0')}
          ${String(startDateTimeKolodar.month).padStart(2, '0')}.${String(startDateTimeKolodar.day).padStart(2, '0')}.${startDateTimeKolodar.year}`
          : 'Loading...' }</p>
        <p>Time {`${String(Time.hours).padStart(2, '0')}:${String(Time.minutes).padStart(2, '0')}:${String(Time.seconds).padStart(2, '0')}`}</p>
        <p>Year: {Year !== null ? Year : 'Loading...'}</p>
        <p>Number year: {numberYear !== null ? numberYear : 'Loading...'}</p>
        <p>Circle number year: {circleNumberYear !== null ? circleNumberYear : 'Loading...'}</p>
        <p>Season number year: {numberSeasonYear !== null ? numberSeasonYear : 'Loading...'}</p>
        <p>Month number year: {numberMonthYear !== null ? numberMonthYear : 'Loading...'}</p>
        <p>Weekday number year: {numberWeekdayYear !== null ? numberWeekdayYear : 'Loading...'}</p>
        <p>Weekdays number god: {numberGodWeekday !== null ? numberGodWeekday : 'Loading...'}</p>
        <p>Day number year: {numberDayYear !== null ? numberDayYear : 'Loading...'}</p>
        <p>Day number season: {numberDaySeason !== null ? numberDaySeason : 'Loading...'}</p>
        <p>Day number month: {numberDayMonth !== null ? numberDayMonth : 'Loading...'}</p>
        <p>Day number weekday: {numberDayWeekday !== null ? numberDayWeekday : 'Loading...'}</p>
        <p>Hour number: {numberHour !== null ? numberHour : 'Loading...'}</p>
        <p>5Minute number: {number5Minute !== null ? number5Minute : 'Loading...'}</p>
        <p>Minute number: {numberMinute !== null ? numberMinute : 'Loading...'}</p>
      </div>
  );
}
