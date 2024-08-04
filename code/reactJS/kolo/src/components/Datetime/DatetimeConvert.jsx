import React, { useState } from "react";
import { calculateDateTimeAttributes } from "./convert_utils";

import useStartDateTime from "./useStartDateTime";

export default function DatetimeConvert() {
  const now = new Date();
  const startDateTimeKolodar = useStartDateTime();

  const [input, setInput] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
  });
  const [result, setResult] = useState({});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleConvert = () => {
    const result = calculateDateTimeAttributes(input, startDateTimeKolodar);
    setResult(result);
  };

  return (
    <div>
      <h3>Convert to calendar</h3>
      <div>
        <label>
          Year:
          <input
            type="number"
            name="year"
            value={input.year}
            onChange={handleChange}
          />
        </label>
        <label>
          Month:
          <input
            type="number"
            name="month"
            value={input.month}
            onChange={handleChange}
          />
        </label>
        <label>
          Day:
          <input
            type="number"
            name="day"
            value={input.day}
            onChange={handleChange}
          />
        </label>
        <label>
          Hours:
          <input
            type="number"
            name="hours"
            value={input.hours}
            onChange={handleChange}
          />
        </label>
        <label>
          Minutes:
          <input
            type="number"
            name="minutes"
            value={input.minutes}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleConvert}>Convert</button>
      </div>
      {Object.keys(result).length > 0 && (
        <div>
          <h4>Converted Values</h4>
          <p>Year: {result.year}</p>
          <p>Number Year: {result.numberYear}</p>
          <p>Circle Number Year: {result.circleNumberYear}</p>
          <p>Day Number Year: {result.numberDayYear}</p>
          <p>Season Number Year: {result.numberSeasonYear}</p>
          <p>Month Number Year: {result.numberMonthYear}</p>
          <p>Weekday Number Year: {result.numberWeekdayYear}</p>
          <p>Day Number Season: {result.numberDaySeason}</p>
          <p>Day Number Month: {result.numberDayMonth}</p>
          <p>Day Number Weekday: {result.numberDayWeekday}</p>
          <p>God Weekday Number: {result.numberGodWeekday}</p>
          <p>Hour Number: {result.numberHour}</p>
          <p>5-Minute Number: {result.number5Minute}</p>
          <p>Minute Number: {result.numberMinute}</p>
        </div>
      )}
    </div>
  );
}
