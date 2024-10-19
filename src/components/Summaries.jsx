import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

function Summaries() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationKey, setLocationKey] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [alert, setAlert] = useState(null);

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

          // Fetch the current weather conditions using the location key
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

  console.log(weatherData);
  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 min-h-50 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-6 text-white">Weather Summaries</h1>
      <p className="text-white mb-4">Based on your location...</p>
      <div className="flex flex-row gap-5">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-5 w-72">
          {weatherData ? (
            <div>
              <h2 className="text-lg font-semibold mb-2">Current Weather</h2>
              <p>Temperature: {weatherData.Temperature.Metric.Value}°C</p>
              <p>Weather: {weatherData.WeatherText}</p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>

        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-5 w-72">
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
      </div>
    </div>
  );
}

export default Summaries;
