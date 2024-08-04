

export function addDateTimeDelta(date, days, hours, minutes, seconds) {
    let result = new Date(date);

    result.setDate(result.getDate() + days);
    result.setHours(result.getHours() + hours);
    result.setMinutes(result.getMinutes() + minutes);
    result.setSeconds(result.getSeconds() + seconds);

    return result;
}

export function subtractDateTimes(date1, date2) {
    /*
    calculate the difference in various units such as days, hours, minutes, and seconds
    
    const date1 = '2024-06-20T12:10:00';
    const date2 = '2024-06-20T12:00:00';
    const difference = subtractDateTimes(date1, date2);
    console.log(difference);
    */

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const diffInMs = d1 - d2;

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return {
        milliseconds: diffInMs,
        seconds: diffInSeconds,
        minutes: diffInMinutes,
        hours: diffInHours,
        days: diffInDays
    };
}

export function convertMillisecondsToDaysHoursSeconds(ms) {
    /* To convert milliseconds to days, hours, and seconds

    const date1 = '2024-06-20T12:10:00';
    const date2 = '2024-05-20T13:43:00';
    const difference = subtractDateTimes(date1, date2);
    const difference_human = convertMillisecondsToDaysHoursSeconds(difference.milliseconds);
    console.log(difference);
    console.log(difference_human);
    */

    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    ms %= (24 * 60 * 60 * 1000);
    
    const hours = Math.floor(ms / (60 * 60 * 1000));
    ms %= (60 * 60 * 1000);
    
    const minutes = Math.floor(ms / (60 * 1000));
    ms %= (60 * 1000);
    
    const seconds = Math.floor(ms / 1000);
    ms %= 1000;
    
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };
}



