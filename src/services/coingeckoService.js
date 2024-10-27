import axios from 'axios';

const COINGECKO_API_URL = import.meta.env.VITE_API_KEY; 

export const fetchCoinData = async () => {
  const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
    headers: {
      'x_cg_pro_api_key': COINGECKO_API_URL,
    },
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,  
      page: 1,
      sparkline: false,
    },
  });
  return response.data;
};
