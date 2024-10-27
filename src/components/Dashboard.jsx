// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { fetchCoinData } from '../services/coingeckoService';

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minMarketCap, setMinMarketCap] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCoinData();
      setCoins(Array.isArray(data) ? data : []);
    };
    getData();
  }, []);

  const filteredCoins = Array.isArray(coins)
    ? coins
      .filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(coin => coin.market_cap >= minMarketCap && coin.current_price <= maxPrice)
    : [];

  return (
    <section className="bg-gray-900 text-white py-10">
      <div className="container mx-auto p-6">
        <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Crypto Information Dashboard</h2>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-10">
            <div className="p-4 bg-gray-700 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Total Cryptocurrencies</h3>
              <p className="text-3xl mt-2">{filteredCoins.length}</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Average Price</h3>
              <p className="text-3xl mt-2">${filteredCoins.reduce((sum, coin) => sum + coin.current_price, 0) / filteredCoins.length || 0}</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Top 3 by Market Cap</h3>
              {filteredCoins.slice(0, 3).map(coin => (
                <p key={coin.id} className="text-lg mt-1">{coin.name}: ${coin.current_price}</p>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search Cryptocurrencies"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full mb-4 p-3 bg-gray-700 rounded focus:outline-none text-white"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min Market Cap"
                value={minMarketCap}
                onChange={e => setMinMarketCap(Number(e.target.value))}
                className="w-full p-3 bg-gray-700 rounded focus:outline-none text-white"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full p-3 bg-gray-700 rounded focus:outline-none text-white"
              />
            </div>
          </div>

          {/* Display Filtered Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoins.map(coin => (
              <div key={coin.id} className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                <h3 className="text-2xl font-semibold">{coin.name}</h3>
                <p className="text-lg mt-2">Price: ${coin.current_price}</p>
                <p className="text-lg">Market Cap: ${coin.market_cap}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
