// src/utils/forecastUtils.js

export function groupForecastByDay(forecastList) {
  const days = {};

  forecastList.forEach((entry) => {
    const date = new Date(entry.dt_txt).toDateString();
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(entry);
  });

  return days;
}
