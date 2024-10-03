import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import Weather from "./components/Weather";
import { fetchWeather } from "./redux/actions/weatherActions";
import "./styles/App.scss";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Geolocation success: ${latitude}, ${longitude}`);
          dispatch(fetchWeather(`lat=${latitude}&lon=${longitude}`));
        },
        (error) => {
          console.log(`Geolocation error: ${error.message}`);
          dispatch(fetchWeather("Yerevan"));
        }
      );
    } else {
      console.log("Geolocation not supported");
      dispatch(fetchWeather("Yerevan"));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Weather />
    </div>
  );
}
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
