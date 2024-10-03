import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import { toggleTemperatureUnit } from "../redux/actions/weatherActions";

function Weather() {
  const dispatch = useDispatch();
  const { data, error, loading, unit } = useSelector((state) => state.weather);

  const handleToggleUnit = () => {
    dispatch(toggleTemperatureUnit());
  };

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="weather-container">
      <Search />
      <button className="unit-toggle" onClick={handleToggleUnit}>
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
      {data && (
        <>
          <CurrentWeather data={data.current} unit={unit} />
          <Forecast data={data.forecast} unit={unit} />
        </>
      )}
    </div>
  );
}

export default Weather;
