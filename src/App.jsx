import React, { useState, useEffect } from "react";

const api = {
  key: "2f23f951fe2938c9d75c3ae17514944a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [bgimg, setBgimg] = useState("App");
  const [message, setMessage] = useState("first");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((resultFromBackend) => resultFromBackend.json())
        .then((jsonFormattedResult) => {
          setWeather(jsonFormattedResult);
          setQuery("");
        });
    }
  };

  useEffect(() => {
    console.log("weather", weather);

    if (weather.cod === 200) {
      const weatherCode = weather.weather[0].id;
      const isThunderstorm = weatherCode >= 200 && weatherCode <= 232;
      const isDrizzle = weatherCode >= 300 && weatherCode <= 321;
      const isRain = weatherCode >= 500 && weatherCode <= 531;
      const isSnow = weatherCode >= 600 && weatherCode <= 622;
      const isAtmosphere = weatherCode >= 700 && weatherCode <= 781;
      const isClear = weatherCode === 800;
      const isCloud = weatherCode >= 801 && weatherCode <= 804;

      isThunderstorm && setBgimg("Thunderstorm");
      isDrizzle && setBgimg("Drizzle");
      isRain && setBgimg("Rain");
      isSnow && setBgimg("Snow");
      isAtmosphere && setBgimg("Atmosphere");
      isClear && setBgimg("Clear");
      isCloud && setBgimg("Clouds");
    } else {
      setMessage(weather.message);
    }
  }, [weather]);

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={`App ${bgimg}`}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">
                <div>
                  <img
                    alt="weatherIcon"
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  />
                </div>
                <div>{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="message">{message}</div>
        )}
      </main>
    </div>
  );
}

export default App;
