import React, { useState, useEffect } from 'react';
import { fetchNewsArticles } from '../services/newsService';
import { analyzeSentiment } from '../utils/sentimentanalyzer';

const SentimentAnalysis = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  useEffect(() => {
    const getNewsData = async () => {
      const articles = await fetchNewsArticles('Bitcoin');
      const analyzedData = articles.map(article => ({
        ...article,
        sentimentScore: analyzeSentiment(article.title),
      }));
      setNewsData(analyzedData);
    };

    getNewsData();
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsData.slice(indexOfFirstArticle, indexOfLastArticle);

  const nextPage = () => {
    if (currentPage < Math.ceil(newsData.length / articlesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="bg-gray-900 text-white py-10">
      <div className="container mx-auto p-6">
        <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Cryptocurrency Sentiment Analysis</h2>

          {/* Display Sentiment Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map((article, index) => (
              <div key={index} className="p-6 bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition duration-300">
                <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
                <p className="text-lg mb-4">{article.description}</p>
                <p className="text-xl font-bold">
                  Sentiment Score:{' '}
                  <span
                    className={`${
                      article.sentimentScore > 0
                        ? 'text-green-400'
                        : article.sentimentScore < 0
                        ? 'text-red-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {article.sentimentScore > 0 ? 'Positive' : article.sentimentScore < 0 ? 'Negative' : 'Neutral'}
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition duration-300 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(newsData.length / articlesPerPage)}
              className="px-4 py-2 mx-2 bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SentimentAnalysis;
