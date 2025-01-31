// src/components/CoinDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const CoinDetail = () => {
  const { coinId } = useParams();

  return (
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Details for {coinId}</h1>
      {/* Add any additional coin details here */}
    </div>
  );
};

export default CoinDetail;
