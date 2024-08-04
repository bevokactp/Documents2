import React, { useEffect, useState } from 'react';

import { getTime } from './convert_utils';

const db_file_path = './data/start_datetime.json';

export default function ReverseAnalogClock () {

  const diametr_clock = 200;

  const [startDateTimeKolodar, setStartDateTimeKolodar] = useState(null);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });


  useEffect(() => {
    fetch(db_file_path)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStartDateTimeKolodar(data.start_datetime);
      })
      .catch((error) => console.error('Error fetching startDateTimeKolodar:', error));
  }, []);

  useEffect(() => {
    if (startDateTimeKolodar) {
      const updateTime = () => {
        setTime(getTime(startDateTimeKolodar));
      };
      updateTime();
      const intervalId = setInterval(updateTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startDateTimeKolodar]);


  // Adjust the rotation for anti-clockwise movement and to match real time positions
  const getRotation = (value, max) => ((1 - (value / max)) * 360);

  const secondsRotation = getRotation(time.seconds, 60);
  const minutesRotation = getRotation(time.minutes, 60) + (secondsRotation / 60);
  const hoursRotation = getRotation((time.hours + 1) % 12, 12) + (minutesRotation / 12);

  const center = diametr_clock / 2;
  const handLength = diametr_clock / 2 - 20;
  const numberRadius = handLength - 20;
  const tickLength = 5;

  return (
    <svg width={diametr_clock} height={diametr_clock}>
      {/* Clock face */}
      <circle cx={center} cy={center} r={center} fill="none" stroke="black" strokeWidth="3" />

      {/* Numbers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = ((12 - i) / 12) * 2 * Math.PI;
        const x = center + numberRadius * Math.sin(angle);
        const y = center - numberRadius * Math.cos(angle);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
          >
            {i === 0 ? 12 : i}
          </text>
        );
      })}

      {/* Ticks */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = ((60 - i) / 60) * 2 * Math.PI;
        const x1 = center + (center - 10) * Math.sin(angle);
        const y1 = center - (center - 10) * Math.cos(angle);
        const x2 = center + (center - 10 - tickLength) * Math.sin(angle);
        const y2 = center - (center - 10 - tickLength) * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="black"
            strokeWidth={i % 5 === 0 ? 2 : 1}
          />
        );
      })}

      {/* Hour hand */}
      <line
        x1={center}
        y1={center}
        x2={center + handLength * 0.5 * Math.sin(hoursRotation * Math.PI / 180)}
        y2={center - handLength * 0.5 * Math.cos(hoursRotation * Math.PI / 180)}
        stroke="black"
        strokeWidth="4"
      />

      {/* Minute hand */}
      <line
        x1={center}
        y1={center}
        x2={center + handLength * 0.75 * Math.sin(minutesRotation * Math.PI / 180)}
        y2={center - handLength * 0.75 * Math.cos(minutesRotation * Math.PI / 180)}
        stroke="black"
        strokeWidth="3"
      />

      {/* Second hand */}
      <line
        x1={center}
        y1={center}
        x2={center + handLength * Math.sin(secondsRotation * Math.PI / 180)}
        y2={center - handLength * Math.cos(secondsRotation * Math.PI / 180)}
        stroke="red"
        strokeWidth="2"
      />
    </svg>
  );
};
