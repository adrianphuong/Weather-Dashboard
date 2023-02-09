import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ac0dc72ac19565e27029eaaab4dec4c`
      );
      const data = await response.json();
      setWeatherData(data);
    }

    if (city) {
      fetchData();
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  const temperature = weatherData.main ? weatherData.main.temp : null;
  const tempCelsius = temperature ? temperature - 273.15 : null;
  const tempFahrenheit = temperature ? (temperature - 273.15) * 9 / 5 + 32 : null;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Weather Report</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="city" placeholder="Enter a city" />
        <button type="submit">Submit</button>
      </form>
      {temperature ? (
        <div>
          <p>Temperature: {temperature.toFixed(2)} Kelvin</p>
          <p>Temperature: {tempCelsius.toFixed(2)}°C</p>
          <p>Temperature: {tempFahrenheit.toFixed(2)}°F</p>
        </div>
      ) : (
        <p>No weather data found.</p>
      )}
    </div>
  );
}

export default App;
