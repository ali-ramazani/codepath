import axios from 'axios';

const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY; ;

export const fetchNewsArticles = async (keyword) => {
  const response = await axios.get(NEWS_API_URL, {
    params: {
      q: keyword,
      apiKey: NEWS_API_KEY,
      language: 'en',
      sortBy: 'relevancy',
    },
  });
  return response.data.articles;
};
