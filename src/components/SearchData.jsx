import { useState } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

function SearchData() {
  const [city, setCity] = useState('');
  const [locationKey, setLocationKey] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [minTemp, setMinTemp] = useState(''); // New state for min temp filter
  const [weatherCondition, setWeatherCondition] = useState(''); // New state for weather condition filter

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    try {
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

        const weatherResponse = await fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`
        );
        if (!weatherResponse.ok) {
          throw new Error(`Weather API request failed with status ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData[0]);

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

  // Filter function
  const filteredData = () => {
    if (!weatherData) return null;

    const temperature = weatherData.Temperature.Imperial.Value;
    const weatherText = weatherData.WeatherText.toLowerCase();

    const tempCondition = minTemp === '' || temperature >= parseInt(minTemp);
    const condition = weatherCondition === '' || weatherText.includes(weatherCondition.toLowerCase());

    return tempCondition && condition ? weatherData : null;
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
        {/* Filters Section */}
      <div className="mt-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-white mb-2">Filters</h2>
        <input
          type="number"
          placeholder="Min Temperature (°F)"
          className="p-2 border rounded mb-4 text-center w-64"
          value={minTemp}
          onChange={(e) => setMinTemp(e.target.value)}
        />
        <input
          type="text"
          placeholder="Weather Condition (e.g. sunny, rain)"
          className="p-2 border rounded mb-4 text-center w-64"
          value={weatherCondition}
          onChange={(e) => setWeatherCondition(e.target.value)}
        />
      </div>
        <button 
          className="bg-white text-blue-500 px-4 py-2 rounded w-32" 
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      

      <div className="mt-8 w-full max-w-md flex flex-col items-center">
        {filteredData() ? (
          <div className="bg-white p-4 rounded shadow-lg w-full mb-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Current Weather in {city}</h2>
            <p>Temperature: {filteredData().Temperature.Imperial.Value}°F</p>
            <p>Weather: {filteredData().WeatherText}</p>
            {filteredData().WeatherIcon && (
              <img
                className="w-20 h-20 mx-auto"
                src={`https://developer.accuweather.com/sites/default/files/${String(filteredData().WeatherIcon).padStart(2, '0')}-s.png`}
                alt="Weather Icon"
              />
            )}
          </div>
        ) : (
          <p className="text-white">No data matching filters or enter a city to get weather data.</p>
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
