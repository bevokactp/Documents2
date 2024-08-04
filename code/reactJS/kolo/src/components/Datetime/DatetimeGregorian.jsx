
import React, { useState, useEffect } from 'react';


const getCurrentGregorianTime = () => {
    return new Date();
  }

const getCurrentTimezone = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = new Date().getTimezoneOffset() / -60; // Получение смещения в часах

  return {
    timezone: timezone,
    offset: offset
  };
}



export default function DatetimeGregorian () {

  const [datetimeGregorian, setDatetimeGregorian] = useState(getCurrentGregorianTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDatetimeGregorian(getCurrentGregorianTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const timezone = getCurrentTimezone();

  return (
    <div>
      <h2>Datetime Gregorian</h2>
      <div>
        <h4>Gregorian datetime</h4>
        <p>datetime: {datetimeGregorian ? datetimeGregorian.toString() : 'Loading...'}</p>
        <p>Timezone: {timezone ? `${timezone.timezone} (UTC ${timezone.offset >= 0 ? '+' : '-'}${timezone.offset})` : 'Loading...'}</p>
      </div>
    </div>
  )
}
