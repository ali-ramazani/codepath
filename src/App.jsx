import { useEffect, useState } from 'react';
import { fetchNewsArticles } from './services/newsService';
import { analyzeSentiment } from './utils/sentimentanalyzer';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard'; 
import SentimentAnalysis from './components/SentimentAnalysis';


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
      <Dashboard /> 
      <SentimentAnalysis /> 
    </div>
  );
};

export default App;
