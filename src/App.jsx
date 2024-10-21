import './App.css'
import Header from './components/Header'
import './index.css';  
import Summaries from './components/Summaries';
import SearchData from './components/SearchData';
import TwentyClosestCountriesWeatherData from './components/TwentyClosestCountriesWeatherData';
import Footer from './components/Footer';

function App() {

  return (
    <div className="main-container">
      <Header />
      <Summaries />
      <TwentyClosestCountriesWeatherData />
      <SearchData />
      <Footer />
    </div>
  )
}

export default App
