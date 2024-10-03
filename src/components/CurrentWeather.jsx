import React from "react";

function CurrentWeather({ data, unit }) {
  return (
    <div className="current-weather">
      <h2>{data.name}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
      />
      <p>
        {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
      </p>
      <p>{data.weather[0].description}</p>
    </div>
  );
}

export default CurrentWeather;
