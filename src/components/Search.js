import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../redux/actions/weatherActions";
import Modal from "./Modal";

function Search() {
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(fetchWeather(city.trim())).catch(() => setShowModal(true));
      setCity("");
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="search">
        <input
          type="text"
          placeholder="Search for a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {showModal && (
        <Modal
          message="City not found. Please try again."
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default Search;
