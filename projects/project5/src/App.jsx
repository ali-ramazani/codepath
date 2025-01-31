import { useEffect, useState } from 'react';
import { fetchNewsArticles } from './services/newsService';
import { analyzeSentiment } from './utils/sentimentanalyzer';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard'; 
import SentimentAnalysis from './components/SentimentAnalysis';
import SentimentChart from './components/SentimentAnalysisChart';
import { Routes, Route } from 'react-router-dom';


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
      <SentimentChart />
      <Routes>
  <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
  <Route path="/sentiment-chart" element={<SentimentChart />} />
</Routes>

    </div>
  );
};

export default App;