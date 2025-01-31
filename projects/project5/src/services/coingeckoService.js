import axios from 'axios';

const COINGECKO_API_URL = import.meta.env.VITE_API_URL;
const COINGECKO_API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCoinData = async () => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      headers: {
        'x_cg_pro_api_key': COINGECKO_API_KEY,
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
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return [];
  }
};
