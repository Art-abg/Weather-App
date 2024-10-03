import React, { useState } from "react";
import { groupForecastByDay } from "../utils/forecastUtils";

function Forecast({ data, unit }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const days = groupForecastByDay(data.list);

  const dayKeys = Object.keys(days);

  if (!selectedDay && dayKeys.length > 0) {
    setSelectedDay(dayKeys[0]);
  }

  const convertTemperature = (temp) => {
    if (unit === "imperial") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  const getDayMaxTemp = (dayData) => {
    return Math.max(...dayData.map((entry) => entry.main.temp));
  };

  return (
    <div className="forecast">
      <div className="day-selector">
        {dayKeys.map((date) => {
          const maxTemp = getDayMaxTemp(days[date]);
          return (
            <button
              key={date}
              onClick={() => setSelectedDay(date)}
              className={selectedDay === date ? "active" : ""}
            >
              {new Date(date).toLocaleDateString(undefined, {
                weekday: "short"
              })}
              <br />
              {convertTemperature(maxTemp)}°{unit === "metric" ? "C" : "F"}
            </button>
          );
        })}
      </div>
      <div className="day-weather">
        {selectedDay && (
          <div className="hourly-forecast">
            {days[selectedDay].map((entry, index) => (
              <div key={index} className="forecast-item">
                <p>
                  {new Date(entry.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${entry.weather[0].icon}.png`}
                  alt={entry.weather[0].description}
                />
                <p>
                  {convertTemperature(entry.main.temp)}°
                  {unit === "metric" ? "C" : "F"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Forecast;
