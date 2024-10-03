import React, { useState } from "react";

function DailyForecast({ data }) {
  const [selectedDay, setSelectedDay] = useState(0);

  const dailyData = [];
  return (
    <div className="daily-forecast">
      <div className="day-selector">
        {dailyData.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={selectedDay === index ? "active" : ""}
          >
            {day.date}
          </button>
        ))}
      </div>
      <div className="day-weather">
        {dailyData[selectedDay] && (
          <div>
            <h3>{dailyData[selectedDay].date}</h3>
            <p>{dailyData[selectedDay].weather}</p>
            <p>{dailyData[selectedDay].temperature}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyForecast;
