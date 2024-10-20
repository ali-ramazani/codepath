import './App.css'
import Header from './components/Header'
import './index.css';  
import Summaries from './components/Summaries';
import SearchData from './components/SearchData';
import TwentyClosestCountriesWeatherData from './components/TwentyClosestCountriesWeatherData';


const API_KEY = import.meta.env.VITE_API_KEY; 

function App() {

  return (
    <div className="main-container">
      <Header />
      <Summaries />
      <TwentyClosestCountriesWeatherData />
      <SearchData />
    </div>
  )
}

export default App
