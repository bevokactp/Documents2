
import React, { useState, useEffect } from 'react';

const holidays_file_path = './data/holidays.json';


export default function Holidays () {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    fetch(holidays_file_path)
      .then(response => response.json())
      .then(data => {
        const groupedHolidays = {};

        // Group holidays by month and then by day
        Object.keys(data).forEach(month => {
          groupedHolidays[month] = {};

          Object.keys(data[month]).forEach(day => {
            groupedHolidays[month][day] = Array.isArray(data[month][day]) ? data[month][day] : [];
          });
        });

        setHolidays(groupedHolidays);
      })
      .catch(error => console.error('Error loading holidays:', error));
  }, []);

  return (
    <div>
      <div>
        <h3>Holiday List</h3>
        <ul>
          {Object.keys(holidays).sort((a, b) => a - b).map(month => (
            <li key={month}>
              <h4>Month: {month}</h4>
              <ul>
                {Object.keys(holidays[month]).sort((a, b) => a - b).map(day => (
                  <li key={day}>
                    Day: {day}
                    <ul>
                      {holidays[month][day].map((holiday, index) => (
                        <li key={index}>
                          Number: {holiday.number}, Name: {holiday.name}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
