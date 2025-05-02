import React, { useEffect, useState } from "react";

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState({}); //stores the weather data (?)
  const API_KEY = import.meta.env.VITE_WEATHER_API;
  const [error, setError] = useState("")

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${70816}` //my API key url and I added my zipcode in place of the city placeholder.
        ); //here I am requesting the data from WeatherAPI

        if (res.status !== 200) {
          throw new Error("Invalid City Name")
        }
        const data = await res.json();
        setWeatherData(data); //stores the output data
        console.log(data); //shows my data on the console
      } catch (error) {
        setError(error.message);
        console.log(error); 
      }
    }
    getData();
  }, []);

 
  //I placed the "html" in a div because I know it can only return one variable, so I made it a parent
  return (
    <div>
      <h1>WeatherApp</h1>
      {error && <p style={{color: "red"}}>{error}</p>} 
      {/* I had to use AI for this because I was so lost on what do with error; even how to call it. */}
      <div>
        <h2>
          {weatherData.location
            ? `${weatherData.location.name}, ${weatherData.location.region}`
            : ""}
        </h2>
        <p>
          <strong>Temp: </strong>
          {weatherData.current?.temp_f}
        </p>
        <p>
          <strong>Condition: </strong>
          {weatherData.current?.condition?.text}{" "}
        </p>
      </div>
    </div>
  );
}
