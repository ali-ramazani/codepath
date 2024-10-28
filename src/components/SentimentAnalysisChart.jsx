// src/components/SentimentChart.jsx
import React, { useState, useEffect } from 'react';
import { fetchNewsArticles } from '../services/newsService';
import { analyzeSentiment } from '../utils/sentimentanalyzer';
import { useNavigate } from 'react-router-dom';

import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Chart from 'chart.js/auto';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SentimentChart = () => {
  const [newsData, setNewsData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sentiment Score',
        data: [],
        backgroundColor: [],
      },
    ],
  });
  const [selectedCoin, setSelectedCoin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getNewsData = async () => {
      const coins = ['Bitcoin', 'Ethereum', 'Litecoin'];
      const sentimentData = [];

      for (let coin of coins) {
        const articles = await fetchNewsArticles(coin);
        if (articles.length === 0) continue;

        const sentimentScore = articles.reduce(
          (total, article) => total + analyzeSentiment(article.title),
          0
        ) / articles.length;

        sentimentData.push({ name: coin, score: sentimentScore, articles });
      }

      setNewsData(sentimentData);

      if (sentimentData.length > 0) {
        setChartData({
          labels: sentimentData.map(item => item.name),
          datasets: [
            {
              label: 'Sentiment Score',
              data: sentimentData.map(item => item.score),
              backgroundColor: sentimentData.map(item =>
                item.score > 0 ? 'rgba(54, 162, 235, 0.6)' : 'rgba(255, 99, 132, 0.6)'
              ),
            },
          ],
        });
      }
    };

    getNewsData();
  }, []);

  const handleBarClick = (elements) => {
    if (!elements || elements.length === 0) return;
    const index = elements[0].index;
    setSelectedCoin(newsData[index]);

    navigate(`/coin/${newsData[index].name.toLowerCase()}`);
  };

  return (
    <section className="bg-gray-900 text-white py-10">
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-10">
        {/* Chart Section */}
        <div className="flex-1 bg-gray-800 p-8 rounded-lg shadow-lg" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <h2 className="text-3xl font-bold text-center mb-8">Cryptocurrency Sentiment Scores</h2>
          {chartData.labels.length > 0 ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                onClick: (evt, elements) => handleBarClick(elements),
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const coin = newsData[context.dataIndex];
                        if (coin) {
                          return `${coin.name}: ${
                            coin.score > 0 ? 'Positive' : coin.score < 0 ? 'Negative' : 'Neutral'
                          }`;
                        }
                        return '';
                      },
                      afterLabel: function (context) {
                        const coin = newsData[context.dataIndex];
                        if (coin) {
                          return `Articles Analyzed: ${coin.articles.length}`;
                        }
                        return '';
                      },
                    },
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
              height={400} 
            />
          ) : (
            <p className="text-center">Loading chart data...</p>
          )}
        </div>

        {/* Detail Section */}
        <div className="flex-1 bg-gray-800 p-8 rounded-lg shadow-lg">
          {selectedCoin ? (
            <>
              <h3 className="text-2xl font-bold mb-4">{selectedCoin.name} Sentiment Details</h3>
              <p className="text-lg mb-4">
                <strong>Average Sentiment Score:</strong>{' '}
                <span
                  className={
                    selectedCoin.score > 0
                      ? 'text-green-400'
                      : selectedCoin.score < 0
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }
                >
                  {selectedCoin.score > 0 ? 'Positive' : selectedCoin.score < 0 ? 'Negative' : 'Neutral'}
                </span>
              </p>
              <h4 className="text-xl font-semibold mb-2">Top News Articles:</h4>
              <ul className="list-disc list-inside space-y-2">
                {selectedCoin.articles.slice(0, 5).map((article, index) => (
                  <li key={index} className="text-sm">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-lg text-center">Click on a cryptocurrency to view sentiment details.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SentimentChart;
