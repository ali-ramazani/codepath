import React, {useState, useEffect} from 'react';
import {fetchNewsArticles} from './services/newsService';
import {analyzeSentiment} from './utils/sentimentanalyzer';
import Header from './components/Header';
import Hero from './components/Hero';

const App = () => {
  const [newsData, setNewsData] = useState([]);

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

  return (
    <div>
      {/* <Header /> */}
      <Hero />
      {newsData.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <p>Sentiment Score: {article.sentimentScore}</p>
        </div>
      ))}
    </div>
  );
};

export default App;