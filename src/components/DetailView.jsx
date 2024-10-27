// src/components/DetailView.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCoinData } from '../services/coingeckoService';

const DetailView = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoinData = async () => {
      try {
        const data = await fetchCoinData(); // Fetch all data from API
        const selectedCoin = data.find(c => c.id === coinId); // Find specific coin by ID
        setCoin(selectedCoin);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCoinData();
  }, [coinId]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!coin) return <p className="text-center text-lg">Coin not found.</p>;

  return (
    <section className="bg-gray-900 text-white py-10">
      <div className="container mx-auto p-6">
        <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4">{coin.name}</h2>
          <p className="text-2xl mb-4">Current Price: ${coin.current_price.toFixed(2)}</p>
          <p className="text-2xl mb-4">Market Cap: ${coin.market_cap.toLocaleString()}</p>
          <p className="text-lg mb-4">24h High: ${coin.high_24h.toFixed(2)}</p>
          <p className="text-lg mb-4">24h Low: ${coin.low_24h.toFixed(2)}</p>
          <p className="text-lg mb-4">Circulating Supply: {coin.circulating_supply.toLocaleString()}</p>
          <p className="text-lg">Total Supply: {coin.total_supply ? coin.total_supply.toLocaleString() : 'N/A'}</p>
        </div>
      </div>
    </section>
  );
};

export default DetailView;
