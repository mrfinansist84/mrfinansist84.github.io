function сonvertCountdown(millsec) {
    const milliseconds = Math.abs(millsec);
    let hours,
        absoluteHours,
        h,
        minutes,
        absoluteMinutes,
        m,
        seconds,
        absoluteSeconds,
        s,
        sign;

    sign = millsec >= 0 ? '+' : '-';

    hours = milliseconds / (1000 * 60 * 60);
    absoluteHours = Math.floor(hours);
    h = absoluteHours < 10 ? '0' + absoluteHours : absoluteHours;

    minutes = (hours - absoluteHours) * 60;
    absoluteMinutes = Math.floor(minutes);
    m = absoluteMinutes < 10 ? '0' + absoluteMinutes : absoluteMinutes;

    seconds = (minutes - absoluteMinutes) * 60;
    absoluteSeconds = Math.floor(seconds);
    s = absoluteSeconds < 10 ? '0' + absoluteSeconds : absoluteSeconds;

    return `${sign}${h}:${m}:${s}`;
}


console.log(сonvertCountdown(-86844000));