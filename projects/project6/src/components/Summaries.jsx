import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

function Summaries() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationKey, setLocationKey] = useState(null);
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [forecast, setForecast] = useState(null); // New state for storing forecast data

  useEffect(() => {
    // Get the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting geolocation: ", error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchLocationKey = async () => {
      if (latitude && longitude) {
        try {
          const locationResponse = await fetch(
            `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`
          );
          if (!locationResponse.ok) {
            throw new Error(`Location API request failed with status ${locationResponse.status}`);
          }
          const locationData = await locationResponse.json();
          setLocationKey(locationData.Key);
          setCityName(locationData.LocalizedName); 

          const weatherResponse = await fetch(
            `http://dataservice.accuweather.com/currentconditions/v1/${locationData.Key}?apikey=${API_KEY}`
          );
          if (!weatherResponse.ok) {
            throw new Error(`Weather API request failed with status ${weatherResponse.status}`);
          }
          const weatherData = await weatherResponse.json();
          setWeatherData(weatherData[0]);

        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    };

    fetchLocationKey();
  }, [latitude, longitude]);

  useEffect(() => {
    const fetchAlert = async () => {
      if (locationKey) {
        try {
          const alertResponse = await fetch(
            `http://dataservice.accuweather.com/alerts/v1/${locationKey}?apikey=${API_KEY}`
          );
          if (!alertResponse.ok) {
            throw new Error(`Alert API request failed with status ${alertResponse.status}`);
          }
          const alertData = await alertResponse.json();
          setAlert(alertData);
        } catch (error) {
          console.error("Error fetching alert data: ", error);
        }
      }
    };

    fetchAlert();
  }, [locationKey]);

  useEffect(() => {
    const fetchForecast = async () => {
      if (locationKey) {
        try {
          const forecastResponse = await fetch(
            `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`
          );
          if (!forecastResponse.ok) {
            throw new Error(`Forecast API request failed with status ${forecastResponse.status}`);
          }
          const forecastData = await forecastResponse.json();
          setForecast(forecastData.DailyForecasts);
        } catch (error) {
          console.error("Error fetching forecast data: ", error);
        }
      }
    };

    fetchForecast();
  }, [locationKey]);

  return (
    <div style={{ backgroundColor: '#4b2e2e' }} className="p-6 min-h-50 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-6 text-white">Weather Summaries</h1>
      <p className="text-white mb-4">Based on your location...</p>
      <div className="flex flex-row gap-5">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-5 w-72">
          {weatherData ? (
            <div className="flex flex-col"> 
              <h2 className="text-lg font-semibold mb-2">Current Weather in {cityName}</h2>
              <p>Temperature: {weatherData.Temperature.Imperial.Value}°F</p>
              <p>Weather: {weatherData.WeatherText}</p>
              {weatherData.WeatherIcon && (
                <img className="w-30 h-30"
                  src={`https://developer.accuweather.com/sites/default/files/${String(weatherData.WeatherIcon).padStart(2, '0')}-s.png`}
                  alt="Weather Icon"
                />
              )}
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>

        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-5 w-72">
        <h2 className="text-lg font-semibold mb-2">Alerts</h2>
          {alert ? (
            <div>
              <h2 className="text-lg font-semibold mb-2">Weather Alerts</h2>
              {alert.length > 0 ? (
                <p>{alert[0].Headline.Text}</p>
              ) : (
                <p>No active alerts</p>
              )}
            </div>
          ) : (
            <p>Loading alerts...</p>
          )}
        </div>

        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-5 w-72">
          {forecast ? (
            <div>
              <h2 className="text-lg font-semibold mb-2">5-Day Forecast</h2>
              <ul>
                {forecast.map((day, index) => (
                  <li key={index}>
                    <p className="font-bold">{new Date(day.Date).toLocaleDateString()}</p>
                    <p>High: {day.Temperature.Maximum.Value}°F</p>
                    <p>Low: {day.Temperature.Minimum.Value}°F</p>
                    <p>{day.Day.IconPhrase}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Loading forecast data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Summaries;
