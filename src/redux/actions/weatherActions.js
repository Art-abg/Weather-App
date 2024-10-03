import axios from "axios";

export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE";
export const TOGGLE_TEMPERATURE_UNIT = "TOGGLE_TEMPERATURE_UNIT";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeather = (query) => async (dispatch, getState) => {
  const { unit } = getState().weather;
  try {
    let url;
    if (typeof query === "string" && query.includes("lat=")) {
      url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=${unit}`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
    }

    const currentWeatherResponse = await axios.get(url);

    const forecastUrl = url.replace("weather?", "forecast?");
    const forecastResponse = await axios.get(forecastUrl);

    dispatch({
      type: FETCH_WEATHER_SUCCESS,
      payload: {
        current: currentWeatherResponse.data,
        forecast: forecastResponse.data
      }
    });
  } catch (error) {
    dispatch({
      type: FETCH_WEATHER_FAILURE,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};

export const toggleTemperatureUnit = () => ({
  type: TOGGLE_TEMPERATURE_UNIT
});
