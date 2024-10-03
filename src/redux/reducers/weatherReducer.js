import {
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  TOGGLE_TEMPERATURE_UNIT
} from "../actions/weatherActions";

const initialState = {
  data: null,
  error: null,
  loading: false,
  unit: "metric"
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_WEATHER_FAILURE:
      return { ...state, loading: false, data: null, error: action.payload };
    case TOGGLE_TEMPERATURE_UNIT:
      return {
        ...state,
        unit: state.unit === "metric" ? "imperial" : "metric",
        data: state.data
          ? {
              ...state.data,
              current: {
                ...state.data.current,
                main: {
                  ...state.data.current.main,
                  temp:
                    state.unit === "metric"
                      ? (state.data.current.main.temp * 9) / 5 + 32
                      : ((state.data.current.main.temp - 32) * 5) / 9
                }
              }
            }
          : null
      };
    default:
      return state;
  }
};
export default weatherReducer;
