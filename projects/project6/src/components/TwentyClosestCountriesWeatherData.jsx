import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

function TwentyClosestCountriesWeatherData() {
  const [weatherData, setWeatherData] = useState([]);

  // Hardcoding 20 cities with their latitude and longitude to fetch their weather data
  const cities = [
    { name: 'New York, USA', lat: 40.7128, lon: -74.006 },
    { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503 },
    { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
    { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093 },
    { name: 'Paris, France', lat: 48.8566, lon: 2.3522 },
    { name: 'Berlin, Germany', lat: 52.52, lon: 13.405 },
    { name: 'Toronto, Canada', lat: 43.65107, lon: -79.347015 },
    { name: 'Beijing, China', lat: 39.9042, lon: 116.4074 },
    { name: 'Cape Town, South Africa', lat: -33.9249, lon: 18.4241 },
    { name: 'Moscow, Russia', lat: 55.7558, lon: 37.6173 },
    { name: 'Mexico City, Mexico', lat: 19.4326, lon: -99.1332 },
    { name: 'Sao Paulo, Brazil', lat: -23.5505, lon: -46.6333 },
    { name: 'Seoul, South Korea', lat: 37.5665, lon: 126.978 },
    { name: 'Mumbai, India', lat: 19.076, lon: 72.8777 },
    { name: 'Buenos Aires, Argentina', lat: -34.6037, lon: -58.3816 },
    { name: 'Cairo, Egypt', lat: 30.0444, lon: 31.2357 },
    { name: 'Rome, Italy', lat: 41.9028, lon: 12.4964 },
    { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708 },
    { name: 'Nairobi, Kenya', lat: -1.2921, lon: 36.8219 },
    { name: 'Bangkok, Thailand', lat: 13.7563, lon: 100.5018 },
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherPromises = cities.map(async (city) => {
          const locationResponse = await fetch(
            `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${city.lat},${city.lon}`
          );
          const locationData = await locationResponse.json();

          const weatherResponse = await fetch(
            `http://dataservice.accuweather.com/currentconditions/v1/${locationData.Key}?apikey=${API_KEY}`
          );
          const weatherData = await weatherResponse.json();

          return {
            city: city.name,
            temperature: weatherData[0].Temperature.Imperial.Value,
            weatherText: weatherData[0].WeatherText,
          };
        });

        const results = await Promise.all(weatherPromises);
        setWeatherData(results);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div
      className="p-6 flex flex-col items-center"
      style={{
        backgroundColor: '#4b2e2e',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflowY: 'auto', 
      }}
    >
      <h1 className="text-3xl font-bold text-white mb-6">Weather in 20 Major Cities Across the World</h1>
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-5 w-full max-w-4xl">
        {weatherData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {weatherData.map((data, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
                <strong>{data.city}</strong>
                <p>Temperature: {data.temperature}°F</p>
                <p>Weather: {data.weatherText}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default TwentyClosestCountriesWeatherData;
