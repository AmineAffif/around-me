import React, { useState, useContext, useEffect } from "react";
import { AddressContext } from "../App";
import Geocode from "react-geocode";

function WeatherWidget() {
  const { address } = useContext(AddressContext);
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState("49.42953869999999");
  const [lng, setLng] = useState("2.0807123");
  const [city, setCity] = useState("");

  Geocode.setApiKey("AIzaSyCg7zSzfzXp3s1_ATawiNFgIZZAWvax1Xo");
  Geocode.setRegion("fr");

  useEffect(() => {
    if (address) {
      Geocode.fromAddress(address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          const city = response.results[0].address_components.find(
            (component) => component.types.includes("locality")
          ).long_name;
          setCity(city);
        },
        (error) => {
          console.error(error);
        }
      );

      const API_KEY = "22a6c758f5660a2adbc639dfa3a9bf3e";
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        });
    }
  }, [address]);

  return (
    <div className="widgetContent">
      {weather ? (
        <div>
          <h2>Weather in {address}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidité: {weather.main.humidity}%</p>
          <p>Pression: {weather.main.pressure} hPa</p>
        </div>
      ) : (
        <p>Enter an address to see the weather</p>
      )}
    </div>
  );
}

export default WeatherWidget;
