import React, { useState, useRef, useEffect } from "react";
import { calculateDateTimeAttributes } from "../Datetime/convert_utils";
import useStartDateTime from "../Datetime/useStartDateTime";
import {
  calculatePresentNameByGrogorian1July,
  calculatePosthumousName,
  calculateSelfNamedName,
  calculateEticdName,
  calculateLanguageName,
} from "./utils";


export default function NamesCalculator() {

  const calculateButtonRef = useRef(null);
  useEffect(() => {
    if (calculateButtonRef.current) {
      calculateButtonRef.current.focus();
    }
  }, []);

  const startDateTimeKolodar = useStartDateTime();

  const [inputs, setInputs] = useState({
    birthSelf: { year: 1993, month: 4, day: 21, hours: 14, minutes: 11 },
    birthFather: { year: 1968, month: 3, day: 31, hours: 8, minutes: 55 },
    birthMother: { year: 1968, month: 2, day: 5, hours: 20, minutes: 43 },
    firstSight: { year: 1988, month: 4, day: 29, hours: 20, minutes: 44 },
    firstTouchGround: { year: 1968, month: 8, day: 5, hours: 20, minutes: 1 },
    firstBreath: { year: 2006, month: 11, day: 5, hours: 20, minutes: 43 },
    firstTouchWater: { year: 2015, month: 12, day: 17, hours: 23, minutes: 30 },
    firstMeal: { year: 2000, month: 10, day: 11, hours: 19, minutes: 13 },
    conception: { year: 1910, month: 11, day: 28, hours: 20, minutes: 43 },
    death: { year: 2023, month: 5, day: 28, hours: 23, minutes: 59 },
  });

  const [result, setResult] = useState({});

  const handleChange = (e, category) => {
    setInputs({
      ...inputs,
      [category]: {
        ...inputs[category],
        [e.target.name]: Number(e.target.value),
      },
    });
  };

  const handleCalculate = () => {
    const results = {};

    Object.keys(inputs).forEach((key) => {
      const result = calculateDateTimeAttributes(
        inputs[key],
        startDateTimeKolodar
      );
      results[key] = result;
    });

    setResult(results);
  };

  const fieldLabels = {
    birthSelf: "Время рождения себя",
    birthFather: "Время рождения отца",
    birthMother: "Время рождения матери",
    firstSight: "Время впервые открыли глаза",
    firstTouchGround: "Время первого касания земли",
    firstBreath: "Время первого вдоха",
    firstTouchWater: "Время первого касания воды",
    firstMeal: "Время первого приёма пищи",
    conception: "Время зачатия себя",
    death: "Время смерти",
  };

  const getNameComponents = (result, field1, field2, separator) => {
    return `${result[field1]}${separator}${result[field2]}`;
  };


  return (
    <div>
      <h3>Calculate names</h3>
      <button ref={calculateButtonRef} onClick={handleCalculate}>Calculate</button>

      {Object.keys(result).length > 0 && (
        <div>
          <h4>Names</h4>
          <p>Настоящее от 1.07: {calculatePresentNameByGrogorian1July(inputs.birthSelf.year, inputs.birthSelf.month, inputs.birthSelf.day)}</p>
          <p>Настоящее от 21.07: {} </p>
          <p>Отчество от 1.07: {calculatePresentNameByGrogorian1July(inputs.birthFather.year, inputs.birthFather.month, inputs.birthFather.day)}</p>
          <p>Обережество от 1.07: {calculatePresentNameByGrogorian1July(inputs.birthMother.year, inputs.birthMother.month, inputs.birthMother.day)}</p>
          <p>Сакральное 1: {getNameComponents(result.firstSight, "number5Minute", "numberHour", "w")}</p>
          <p>Сакральное 2: {getNameComponents(result.firstTouchGround, "number5Minute", "numberHour", "w")}</p>
          <p>Сакральное 3: {getNameComponents(result.firstBreath, "number5Minute", "numberHour", "w")}</p>
          <p>Сакральное 4: {getNameComponents(result.firstTouchWater, "number5Minute", "numberHour", "w")}</p>
          <p>Сакральное 5: {getNameComponents(result.firstMeal, "number5Minute", "numberHour", "w")}</p>
          <p>Непроизносимое: {getNameComponents(result.conception, "numberHour", "number5Minute", "!")}</p>
          <p>Родовое: {getNameComponents(result.birthSelf, "numberDayMonth", "numberWeekdayYear", "ё")}</p>
          <p>Вечное: {getNameComponents(result.conception, "numberWeekdayYear", "numberDayMonth", "е")}</p>
          <p>Духовное: {getNameComponents(result.conception, "year", "numberMonthYear", "є")}</p>
          <p>Языковое: {calculateLanguageName(result.birthSelf)}</p>
          <p>Этическое: {calculateEticdName(result)}</p>
          <p>Самонаречённое: {calculateSelfNamedName(result)}</p>
          <p>Посмертное: {calculatePosthumousName(result.death)}</p>
        </div>
      )}

      {Object.keys(inputs).map((key) => (
        <div key={key}>
          <h4>{fieldLabels[key]}</h4>
          <label>Year: <input type="number" name="year" value={inputs[key].year} onChange={(e) => handleChange(e, key)} /></label>
          <label>Month: <input type="number" name="month" value={inputs[key].month} onChange={(e) => handleChange(e, key)} /></label>
          <label>Day: <input type="number" name="day" value={inputs[key].day} onChange={(e) => handleChange(e, key)} /></label>
          <label>Hours: <input type="number" name="hours" value={inputs[key].hours} onChange={(e) => handleChange(e, key)} /></label>
          <label>Minutes: <input type="number" name="minutes" value={inputs[key].minutes} onChange={(e) => handleChange(e, key)} /></label>
        </div>
      ))}
    </div>
  );
}
