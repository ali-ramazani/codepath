import { useEffect, useState } from 'react';
import { fetchNewsArticles } from './services/newsService';
import { analyzeSentiment } from './utils/sentimentanalyzer';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard'; // Updated path

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
      <Dashboard /> {/* Dashboard included */}
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
