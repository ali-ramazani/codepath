import { useState } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

function SearchData() {
  const [city, setCity] = useState('');
  const [locationKey, setLocationKey] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // Fetch location key based on city name
      const locationResponse = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`
      );
      if (!locationResponse.ok) {
        throw new Error(`Location API request failed with status ${locationResponse.status}`);
      }
      const locationData = await locationResponse.json();
      if (locationData.length > 0) {
        const cityKey = locationData[0].Key;
        setLocationKey(cityKey);

        // Fetch weather data based on location key
        const weatherResponse = await fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`
        );
        if (!weatherResponse.ok) {
          throw new Error(`Weather API request failed with status ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData[0]);

        // Fetch weather alerts based on location key
        const alertResponse = await fetch(
          `http://dataservice.accuweather.com/alerts/v1/${cityKey}?apikey=${API_KEY}`
        );
        if (!alertResponse.ok) {
          throw new Error(`Alert API request failed with status ${alertResponse.status}`);
        }
        const alertData = await alertResponse.json();
        setAlert(alertData);
      } else {
        alert('City not found!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="p-6" style={{ backgroundColor: '#4b2e2e', minHeight: '30vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-3xl font-bold text-white mb-6">Search Weather Data</h1>
      <div className="flex flex-col items-center">
        <input 
          type="text" 
          placeholder="Enter city name" 
          className="p-2 border rounded mb-4 text-center w-64" 
          value={city} 
          onChange={handleCityChange} 
        />
        <button 
          className="bg-white text-blue-500 px-4 py-2 rounded w-32" 
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="mt-8 w-full max-w-md flex flex-col items-center">
        {weatherData ? (
          <div className="bg-white p-4 rounded shadow-lg w-full mb-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Current Weather in {city}</h2>
            <p>Temperature: {weatherData.Temperature.Imperial.Value}°F</p>
            <p>Weather: {weatherData.WeatherText}</p>
            {weatherData.WeatherIcon && (
              <img
                className="w-20 h-20 mx-auto"
                src={`https://developer.accuweather.com/sites/default/files/${String(weatherData.WeatherIcon).padStart(2, '0')}-s.png`}
                alt="Weather Icon"
              />
            )}
          </div>
        ) : (
          <p className="text-white">Enter a city to get weather data.</p>
        )}
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        {alert ? (
          <div className="bg-white p-4 rounded shadow-lg w-full text-center">
            <h2 className="text-lg font-semibold mb-2">Weather Alerts</h2>
            {alert.length > 0 ? (
              <p>{alert[0].Headline.Text}</p>
            ) : (
              <p>No active alerts</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchData;
